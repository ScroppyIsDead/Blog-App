from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from . serializers import BlogSerializer
import json
from . models import Blog
from django.utils.text import slugify

def create_article(request):
    if request.method == "POST":
        try:

            data = json.loads(request.body)
            title = data.get("title")
            content = data.get("content")
            author = request.user

            slug = slugify(title)
            i = 1
            while Blog.objects.filter(slug=slug).exists():
                slug = f"{slug}-{i}"
                i += 1

            article = Blog.objects.create(title=title, content=content, author=author, slug=slug)
            return JsonResponse({"message": "created blog"}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"message": "error decoding json"}, status=400)
    else:
        return JsonResponse({"message": "invalid format"}, status=400)

def get_own_articles(request):
    if request.method == "GET":
            blogs = Blog.objects.filter(author=request.user)
            blog_data = []
            for blog in blogs:
                blog_data.append({
                    'title': blog.title,
                    'date_posted': blog.date_posted.strftime('%Y-%m-%d'),
                    'author': blog.author.username,
                    'slug': blog.slug,
                    'last_updated': blog.last_updated,
                    'content': blog.content,
                })
            # Return JsonResponse with blog data if there are blogs, otherwise return an empty list
                
            return JsonResponse(blog_data, safe=False)
    else:
        return JsonResponse({"message": "Error getting blogs"}, status=401)

# Create your views here.
def make_article(request):
    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.User)
        return JsonResponse({"message": "Successfully created Blog"}, status=201)
    return JsonResponse({"message": "error creating blog"}, status=401)