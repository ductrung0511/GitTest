from rest_framework import serializers
from .models import Blog, Contact, Resource, ModelCourse, Question, ModelSession, Section, Exercise, Profile

class Blogserializer(serializers.ModelSerializer):
    class Meta: 
        model = Blog
        fields = '__all__'
class CustomBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['title', 'url', 'img', 'description', 'created', 'id']

class ModelSessionserializer(serializers.ModelSerializer):
    class Meta: 
        model = ModelSession
        fields = '__all__'
class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['name', 'content']
class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'
class ContactSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Contact
        fields = '__all__'


class ModelCourseserializer(serializers.ModelSerializer):
    class Meta:
        model = ModelCourse
        fields ='__all__'


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['incorrect_answers'] = instance.incorrect_answers.get('incorrect_answers', [])  # JSONField will be serialized automatically
        return data

from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model= User
        fields ='__all__'
    def create(self, validated_data):
        user = User.objects.create(
            username  = validated_data['username'],
            email = validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = '__all__'