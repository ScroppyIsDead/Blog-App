# Generated by Django 5.0.1 on 2024-03-12 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_auto_20240310'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(default='static/images/DefaultProfile.jpg', upload_to='avatars/'),
        ),
    ]