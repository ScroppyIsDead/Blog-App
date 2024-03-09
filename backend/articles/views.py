from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from . serializers import BlogSerializer
import json
import random
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
                    "authorid": blog.author.id,
                    'slug': blog.slug,
                    'last_updated': blog.last_updated,
                    'content': blog.content,
                })
            # Return JsonResponse with blog data if there are blogs, otherwise return an empty list
                
            return JsonResponse(blog_data, safe=False)
    else:
        return JsonResponse({"message": "Error getting blogs"}, status=401)

def get_all_articles(request):
    if request.method == "GET":
        blogs = Blog.objects.order_by("-date_posted")[:20]
        blog_data = []
        for blog in blogs:
            blog_data.append({                  
                    'title': blog.title,
                    'date_posted': blog.date_posted.strftime('%Y-%m-%d'),
                    'author': blog.author.username,
                    "authorid": blog.author.id,
                    'slug': blog.slug,
                    'last_updated': blog.last_updated,
                    'content': blog.content,
                    })
        return JsonResponse(blog_data, safe=False)
    else:
        return JsonResponse({"message": "Error getting blogs"}, status=401)

def get_article_from_slug(request, slug):
    if request.method == "GET":
        try:
            blog = Blog.objects.get(slug=slug)
            response_data = {
                "title": blog.title, 
                "content": blog.content, 
                "slug": blog.slug, 
                "date_posted": blog.date_posted.strftime('%Y-%m-%d'), 
                "last_updated": blog.last_updated, 
                "author": blog.author.username,
                }
            return JsonResponse(response_data)
        except Blog.DoesNotExist:
            return JsonResponse({'error': 'Blog not found'}, status=404)
    else:
        return JsonResponse({"message": "Error getting blogs"}, status=401)

def get_random_article(request):
    if request.method == "GET":
        total_blogs = Blog.objects.count()
        random_index = random.randint(0, total_blogs - 1)
        random_blog = Blog.objects.all()[random_index]

        response_data = {
            "title": random_blog.title,
            "content": random_blog.content,
            "slug": random_blog.slug,
            "date_posted": random_blog.date_posted.strftime('%Y-%m-%d'),
            "last_updated": random_blog.last_updated,
            "author": random_blog.author.username,
        }
        
        return JsonResponse(response_data)
    else: 
        return JsonResponse({"message": "Request method is meant to be \"get\""}, status=401)

def article_delete(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            data = json.loads(request.body)
            slug = data.get("slug")
            author_id = data.get("author_id")

            objects_to_delete = Blog.objects.filter(slug=slug, author_id=author_id)

            if (author_id == request.user.id):
                objects_to_delete.delete()
                return JsonResponse({"message": "objects deleted"}, status=203)
            
            return JsonResponse({"message": "your userID doesnt match the author's id", "author": author_id, "you": request.user.id}, status=401)
        return JsonResponse({"message": "You are unauthenticated"}, status=401)
    else: JsonResponse({"message": "Invalid Data"})

