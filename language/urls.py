"""
URL configuration for language project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from language import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("admin/", admin.site.urls),
    path("api/index/", views.index, name="index"),

    path("api/courses/", views.courses, name="courses"),
    path("api/courses/<int:id>", views.course, name="course"),
    path("api/session/<int:id>", views.session, name="session"),
    path("api/section/<int:id>", views.section, name="section"),
    path("api/register/", views.register, name="register"),
    path("api/profile/", views.profile),
    path("api/exercises/", views.exercises),
    path("api/resources/", views.resources),
    path("api/contact/", views.contact),
    path("api/performance/", views.performance),
    path("api/category/<int:id>", views.category),
    path("api/exercise_session/<int:id>", views.exercise_session),
    
    

    
    path("api/questions/", views.questionView, name="questionView"),
    #path("api/blog/", views.blog, name="blog"),
    path("api/blog/<int:id>", views.blogDetails, name="blogDetails"),
    path( '', TemplateView.as_view(template_name= 'index.html')),

    
    #path("api/workspace/", views.workspace, name="workspace"),

]  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
