from .models import HomeDetails, Blog, ModelCourse, Question, Contact, ModelSession, Exercise, Section, Category, Profile, Resource
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import Blogserializer, ResourceSerializer, ModelSessionserializer, ProfileSerializer, ExerciseSerializer, UserSerializer, SectionSerializer, ContactSerializer,QuestionSerializer, CustomBlogSerializer, ModelCourseserializer
from rest_framework_simplejwt.tokens import RefreshToken
import json

@api_view(["GET", "POST"])
def index(request):
    if request.method == "GET":
        #get all the drink obj
        #serialize all
        #return json format
        # Get the three most recent blog objects based on the 'date' attribute
        blogs = Blog.objects.order_by('-created')[:3]  # Retrieve the latest three entries
        blogserializer = CustomBlogSerializer(blogs, many=True) # When serializing the blog objects, we use CustomBlogSerializer instead of Blogserializer.

        categories = Category.objects.all()
        courseCategories= {}
        for category in categories:
            # print(ModelCourse.objects.filter( category = category))
            courseCategories[ category.name] = ModelCourseserializer(category.modelcourse_set.all() , many=True).data
            #featureCourses[] = ModelCourseserializer(category.course_category.all() , many=True).data
        returnData  = { 'blogs' : blogserializer.data, "courseCategories" : courseCategories }
        return Response(returnData , status = status.HTTP_200_OK)
    
    if request.method == "POST":

        serializer = ContactSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response( serializer.data , status = status.HTTP_201_CREATED) #why return response ...
@api_view(["GET", "POST", "PUT"])
@permission_classes([IsAuthenticated])
def courses(request):
    if request.method == "GET":
        courses = ModelCourse.objects.all()
        coursesserializer = ModelCourseserializer(courses, many=True)
        responseData  = { 'courses' : coursesserializer.data }
        return Response(responseData , status = status.HTTP_200_OK)
    elif request.method == "POST":
        request_data = request.data.copy()
        request_data['duration'] = int(request_data.get('duration', 0))
        request_data['sale'] = int(request_data.get('sale', 0))
        print(request.data['category'])
         
        category_id = request.data.get('category')  # Extract course ID from request data
        try:
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ModelCourseserializer(data=request_data)
        if serializer.is_valid():
            serializer.validated_data['category'] = category
            serializer.save()
            return Response(request.data, status = status.HTTP_202_ACCEPTED)
        return Response(status= status.HTTP_400_BAD_REQUEST)
    elif request.method=="PUT":
        course = ModelCourse.objects.get(pk=request.data.get('id'))
        request_data = request.data.copy()
        request_data['duration'] = int(request_data.get('duration', 0)) ##
        request_data['sale'] = int(request_data.get('sale', 0))##
        category_id = request.data.get('category')  # Extract course ID from request data
        try:
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ModelCourseserializer( instance=course, data=request_data)
        if serializer.is_valid():
            serializer.validated_data['category'] = category
            serializer.save()
            return Response(serializer.data, status = status.HTTP_202_ACCEPTED)
        return Response(status= status.HTTP_400_BAD_REQUEST)

        
    

@api_view(["GET", "DELETE"])
@permission_classes([IsAuthenticated])
def course(request, id):
    try : 
        course = ModelCourse.objects.get(pk=id)       
    except ModelCourse.DoesNotExist: # ........
        return Response("data not found", status= status.HTTP_404_NOT_FOUND) 
    if request.method =="GET":       
        courseserializer = ModelCourseserializer(course)
        sessions = ModelSession.objects.filter(course=course)
        sessions_serializer = ModelSessionserializer(sessions, many=True)
        session_data = [{'id': session.id, **session_data} for session, session_data in zip(sessions, sessions_serializer.data)]

        responseData = {'course': courseserializer.data, 'sessions': session_data}
        return Response(responseData , status = status.HTTP_200_OK)
    elif request.method == "DELETE":
        course.delete()
        return Response(status= status.HTTP_204_NO_CONTENT)
    if request.method == 'POST':
        course_id = request.data.get('course')  # Extract course ID from request data
        try:
            course = ModelCourse.objects.get(pk=course_id)
        except ModelCourse.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ModelSessionserializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['course'] = course  # Associate course with session
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from .models import Exercise
@api_view(["GET", "DELETE", "POST", "PUT"])
@permission_classes([IsAuthenticated])
def session(request, id):
    if(request.method != "POST"):
        try : 
            session = ModelSession.objects.get(pk=id)       
        except ModelSession.DoesNotExist: # ........
            return Response("data not found", status= status.HTTP_404_NOT_FOUND) 
    if request.method == "GET":
        session_serializer = ModelSessionserializer(session)
        sections = Section.objects.filter( session = session)
        exercises = Exercise.objects.filter(session = session)
        serialized_exercises =  [ {**ExerciseSerializer(exercise).data, "id": exercise.id} for exercise in exercises ]
        #section_serializer= SectionSerializer(sections, many=True)
        serialized_sections = [ {**SectionSerializer(section).data, "id": section.id} for section in sections]

        """
        before_sections = session.beforeClass.all()
        before_section_serializer = Sectionserializer(before_sections, many=True)

        in_sections = session.inClass.all()
        in_section_serializer = Sectionserializer(in_sections, many=True)

        after_sections = session.afterClass.all()
        after_section_serializer = Sectionserializer(after_sections, many=True)
        """

        response_data = {
            'sections' : serialized_sections,
            'session': session_serializer.data,
            'exercises' : serialized_exercises,
        }
        return Response(response_data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        print(request.data)
        course_id = request.data.get('course')  # Extract course ID from request data
        try:
            course = ModelCourse.objects.get(pk=course_id)
        except ModelCourse.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)
    
        serializer = ModelSessionserializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['course'] = course  # Associate course with session
            newSession = serializer.save()
            session_data = {'id':  newSession.id, **serializer.data}
            return Response(session_data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        session.delete()
        return Response(status= status.HTTP_204_NO_CONTENT)
    elif request.method == "PUT": 
        serializer = ModelSessionserializer(instance=session, data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,  status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE", "POST", "PUT"])
@permission_classes([IsAuthenticated])
def section(request, id):    
    if(request.method != "POST"):
        try : 
            section = Section.objects.get(pk=id)       
        except ModelSession.DoesNotExist:    #........
            return Response("data not found", status= status.HTTP_404_NOT_FOUND) 
    if request.method == 'POST':
        sessionID = request.data.get('sessionID')  # Extract course ID from request data
        print(sessionID)
        try:
            session = ModelSession.objects.get(pk=sessionID)
        except ModelSession.DoesNotExist:
            return Response({"error": "session not found"}, status=status.HTTP_404_NOT_FOUND)
    
        serializer = SectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['session'] = session  # Associate course with session
            newSection = serializer.save()
            
            sectionData = {'id':  newSection.id, **serializer.data}
            return Response(sectionData, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PUT": 
        serializer = SectionSerializer(instance=section, data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({**serializer.data, "id" : id},  status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        section.delete()
        return Response(status= status.HTTP_204_NO_CONTENT)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def blogDetails(request, id):
    try : 
        blog = Blog.objects.get(pk = id)
    except Blog.DoesNotExist: # ........
        return Response("data not found", status= status.HTTP_404_NOT_FOUND) 
    
    if request.method == "DELETE":
    
        blog.delete()
        return Response(status= status.HTTP_204_NO_CONTENT)
    elif request.method == "PUT":
        serializer = Blogserializer(blog, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(request.data, status = status.HTTP_202_ACCEPTED)
        return Response(status= status.HTTP_400_BAD_REQUEST)
        
@api_view(["GET"])
def questionView(request):
    if request.method == "GET":
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    

    
@api_view(["POST"])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        tokens = {
            'refresh' : str(refresh),
            'access' : str(refresh.access_token ),
        }
        print(tokens," MM")

        return Response(tokens, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def profile(request): 
    user = request.user
    # Query the Profile model using the authenticated user's ID
    try:
        profile = Profile.objects.get(user=user)
    except Profile.DoesNotExist:
        return Response({"message": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = ProfileSerializer(profile)
        profileData = {**serializer.data, "username": user.username, "is_superuser" : user.is_superuser, "is_staff" : user.is_staff, "last_login": user.last_login}
        return Response(profileData,  status= status.HTTP_200_OK)
    elif request.method == "PUT":

        # {"bio": request.data["bio"], "school": request.data["school"] }
        serializer = ProfileSerializer(instance=profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data,  status= status.HTTP_200_OK )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
def exercise_session(request, id):
    
    if request.method == "GET":
        try:
            session = ModelSession.objects.get(pk = id)
        except ModelCourse.DoesNotExist:
            return Response( {"error": "session not found"} , status=status.HTTP_400_BAD_REQUEST)

        exercises = session.exercise_set.all()
        postData = ExerciseSerializer(exercises, many=True).data
        return Response(postData, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        try:
            session = ModelSession.objects.get(pk = id)
        except ModelCourse.DoesNotExist:
            return Response( {"error": "session not found"} , status=status.HTTP_400_BAD_REQUEST)
        
        dataSerialize = request.data.copy()
        # dataSerialize['questions'] = json.loads(request.data['questions'] )
        print(dataSerialize['questions'])
        serializer = ExerciseSerializer(data=dataSerialize)

        if serializer.is_valid():
            serializer.validated_data['session'] = session  # Associate course with session
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PUT": 
        try:
            exercise = Exercise.objects.get(pk=id)
        except Exercise.DoesNotExist:
            return Response({"error": "exercise not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ExerciseSerializer(instance=exercise, data= request.data)
        if serializer.is_valid(): 
            serializer.save() 
            return Response(serializer.data,  status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        try:
            exercise = Exercise.objects.get(pk=id)
        except Exercise.DoesNotExist:
            return Response({"error": "exercise not found"}, status=status.HTTP_404_NOT_FOUND)
        exercise.delete()
        return Response(status= status.HTTP_204_NO_CONTENT)
    



@api_view(["GET", "PUT", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
def exercises(request): 
    if request.method  == "GET": 

        exercises = Exercise.objects.all()
        profile  = Profile.objects.get(user= request.user)
        postExercises = []
        if request.user.is_staff :
            postExercises = exercises
        if request.user.is_staff == False:
            for exercise  in exercises:
                course_id = exercise.session.course.id
                if str(course_id)  in profile.courseSave.split('/'): 
                    postExercises.append(exercise)
        print(profile.courseSave.split('/'))           

        postData = ExerciseSerializer(postExercises, many=True).data
        return Response(postData, status= status.HTTP_200_OK)
    elif request.method == 'POST':
        sessionID = request.data.get('sessionID')  # Extract course ID from request data
        try:
            session = ModelSession.objects.get(pk=sessionID)
        except ModelSession.DoesNotExist:
            return Response({"error": "session not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['session'] = session  # Associate course with session
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PUT": 

        try:
            exercise = Exercise.objects.get(pk=request.data.get('exerciseID'))
        except Exercise.DoesNotExist:
            return Response({"error": "exercise not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ExerciseSerializer(instance=exercise, data= request.data)
        if serializer.is_valid(): 
            serializer.save() 
            return Response(serializer.data,  status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        try:
            exercise = Exercise.objects.get(pk=request.data.get('exerciseID'))
        except Exercise.DoesNotExist:
            return Response({"error": "exercise not found"}, status=status.HTTP_404_NOT_FOUND)
        exercise.delete()
        return Response(status= status.HTTP_204_NO_CONTENT)





@api_view(["GET", "PUT", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
def resources(request): 
    if request.method  == "GET": 
        resources = Resource.objects.all()
        postData = ResourceSerializer(resources, many=True).data
        return Response(postData, status= status.HTTP_200_OK)
    
    elif request.method == "PUT": 
        try:
            resource = Resource.objects.get(pk=request.data.get('id'))
        except Resource.DoesNotExist:
            return Response({"error": "resource not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ResourceSerializer(instance=resource, data= request.data)
        if serializer.is_valid(): 
            serializer.save() 
            return Response(serializer.data,  status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'POST':
        serializer = ResourceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        print(request.data.get('id'))
        try:
            resource = Resource.objects.get(pk=request.data.get('id'))
        except Resource.DoesNotExist:
            return Response({"error": "resource not found"}, status=status.HTTP_404_NOT_FOUND)
        resource.delete()
        return Response(status= status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def category(request, id): 
    if request.method == 'GET':
        try :
            category = Category.objects.get(pk= id)
        except Category.DoesNotExist:
            return Response({"error": "  Category not found"}, status=status.HTTP_404_NOT_FOUND)
        courses = category.modelcourse_set.all()
        data = ModelCourseserializer(courses, many=True).data
        print(data)
        return Response(data, status = status.HTTP_200_OK)

@api_view(['GET','POST'])
def contact(request): 
    if request.method == 'GET':
        contacts = Contact.objects.all()
        data = ContactSerializer(contacts, many=True).data
        return Response(data, status = status.HTTP_200_OK)
        
    elif request.method == "POST":
        serializer = ContactSerializer(data = request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def performance(request): 
    if request.method == 'GET':
        profile = Profile.objects.get(user= request.user)
        courses = []
        for i in profile.courseSave.split('/'):
            if i != '':
                course = ModelCourse.objects.get(pk= i)
                sessions =  course.modelsession_set.all()
                totalSession = len(sessions)
                totalExercise = 0

                exerciseIDs = []
                for session in sessions:
                    exercises = session.exercise_set.all()
                    totalExercise += len(exercises)
                    for exercise in exercises :
                        exerciseIDs.append(exercise.id)
                

                courseData = { **ModelCourseserializer(course).data, 'totalSession' :  totalSession, 'totalExercise': totalExercise}
                courses.append(courseData)

        data = { 'courses' :courses, 'exerciseLog': profile.exerciseLog}
        
        return Response(data, status = status.HTTP_200_OK)
        
# @api_view(['PUT', 'GET'])
# def courseSave(request) :
#     if request.method == "PUT":
#         user = request.user
#         profile  = Profile.objects.get(user= user)
        


        

















 

