from django.db import migrations
from django.contrib.auth.models import User
from accounts.models import Profile  # Replace 'yourapp' with your app name

def create_profiles(apps, schema_editor):
    for user in User.objects.all():
        Profile.objects.create(user=user)  # Create a profile for each user

class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_initial'),  # Replace '000x' with your actual migration number
    ]

    operations = [
        migrations.RunPython(create_profiles),
    ]