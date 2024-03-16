import json
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from . models import Profile
from django.contrib.auth.decorators import login_required
from django.core.files.base import ContentFile
import base64
from django.shortcuts import get_object_or_404  
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated  # Optional authentication
from .serializers import ProfileSerializer

# Create your views here.
def register(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password1 = data.get('password1')
            email = data.get('email')
            password2 = data.get('password2')
            botcheck = data.get("email2")

            if botcheck:
                return JsonResponse({"message": "Error Creating Account BOT"}, status=400)

            if password1 != password2:
                return JsonResponse({"message": "Passwords dont match"}, status=400)
            
            if password1.find(" ") != -1:
                return JsonResponse({"message": "Password can not contain a space"}, status=400)

            if username.find(" ") != -1:
                return JsonResponse({"message": "Username can not contain a space"}, status=400)

            if email.find(" ") != -1:
                return JsonResponse({"message": "Email can not contain a space"}, status=400)

            if len(password1) > 24:
                return JsonResponse({"message": "Password too long, maximum length is 24 characters"}, status=400)
            
            if len(username) > 24:
                return JsonResponse({"message": "Username is too long, maximum length is 24 characters"}, status=400)

            user = User.objects.create_user(username=username, password=password1, email=email)

            return JsonResponse({"message": "Sucessfully created user"}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "Invalid JSON format"}, status=400)
    else:
        return JsonResponse({"success": False, "message": "Invalid request method"}, status=400)
    
def userlogin(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
            if username and password:
                user = authenticate(request=request, username=username, password=password)
                if user is not None:
                    login(request, user)
                    return JsonResponse({"message": "Successfully logged in"})
                
                return JsonResponse({"message": "Incorrect Username or Password"}, status=401)
            return JsonResponse({"message": "Username and password are required"}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "Invalid JSON format"}, status=400)
    return JsonResponse({"success": False, "message": "Invalid request method"}, status=405)

def getuserinformation(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            username = request.user.username
            return JsonResponse({"message": username})
        else: 
            return JsonResponse({"message": "User is not authenticated"}, status=401)
        
def getusersemail(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            email = request.user.email
            parts = email.split("@")
            firstpart = parts[0]
            secondpart = parts[1]
            if len(firstpart) > 4:
                hiddenfirstpart = firstpart[:4] + "*" * (len(firstpart))
            else:
                hiddenfirstpart = "*" * len(firstpart)
            finalresult = f"{hiddenfirstpart}@{secondpart}"
            return JsonResponse({"message": finalresult})
        else: 
            return JsonResponse({"message": "User is not authenticated"}, status=401)
        
def userlogout(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            logout(request)
            return JsonResponse({"message": "user logged out succesffully"})
        return JsonResponse({"message": "user no auth"}, status=401)
    return JsonResponse({"message": "Data type Invalid"}, status=401)

def getallusers(request): 
    if request.method == "GET":
        users = User.objects.all()
        all_users = []
        for user in users:
            username = user.username
            all_users.append({"username": username})
        return JsonResponse(all_users, safe=False)
    else:    
        return JsonResponse({"message": "Data type Invalid"}, status=401)        

def get_bio_info(request, slug):
    if request.method == "GET":
            user = User.objects.filter(username=slug).first()
            if user:
                if user.profile.avatar:
                    avatar_url = user.profile.avatar.url
                else: 
                    avatar_url = "/static/images/DefaultProfile.jpg"
                bio_info = user.profile
                results = {
                        "bio": bio_info.bio,
                        "username": user.username,
                        "avatar": avatar_url,
                        }
                return JsonResponse(results)
            return JsonResponse({"message": "no user found"}, status=404)
    return JsonResponse({"message": "invalid method, must be GET"}, status=401)

def change_bio(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            
                data = json.loads(request.body)
                new_bio = data.get("bio")
                request.user.profile.bio = new_bio
                request.user.profile.save()
                return JsonResponse({"message": "successfully changed bio"}, status=201)
        return JsonResponse({"message": "Error, not logged in"}, status=401)     
    return JsonResponse({"message": "invalid method, must be POST"}, status=401)

@ensure_csrf_cookie
def get_csfr_token(request):
    return JsonResponse({"csrfToken": get_token(request)})

@login_required
def upload_avatar(request):
    if request.method == "POST":
        try:
            if 'image' not in request.FILES:
                return JsonResponse({'message': 'No image file provided'}, status=400)

            image_file = request.FILES['image']

            # Basic validation (optional, consider using a library for more robust validation)
            if not image_file.content_type.startswith('image/'):
                return JsonResponse({'message': 'Invalid file type. Only images allowed.'}, status=400)

            filename_parts = image_file.name.split('.')
            file_extension = filename_parts[-1] if len(filename_parts) > 1 else ''
            filename = f"avatar_{request.user.username}.{file_extension}"

            # Handle potential issues with file saving
            try:
                image_content = ContentFile(image_file.read())
                user_profile = request.user.profile
                user_profile.avatar.delete()
                user_profile.avatar.save(filename, image_content)
            except Exception as e:
                print(f"Error saving image: {e}")
                return JsonResponse({'message': 'Error saving uploaded image.'}, status=500)

            return JsonResponse({'message': 'Successfully uploaded image'})
        except Exception as e:
            print(f"Unexpected error uploading avatar: {e}")
            return JsonResponse({'message': 'Error uploading image.'}, status=500)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=400)