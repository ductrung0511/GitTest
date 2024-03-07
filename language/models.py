
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver




class Resource( models.Model):
    # course = models.ForeignKey('ModelCourse', default = 2, on_delete= models.CASCADE)
    name  = models.CharField(max_length=40)
    bgCardUrl = models.URLField(null= True, blank=True)
    serial = models.CharField(max_length=100, default='')
    description = models.TextField(default='')
    url = models.URLField(null= True, blank=True)
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
    bio = models.TextField(blank=True, default="")
    school = models.CharField(blank=True, default="", max_length=80)
    courseKey= models.CharField(max_length= 100, blank=True, default = "")
    #courseList= models.CharField(max_length= 100, blank=True, default = "")
    courseSave = models.CharField(max_length= 300, default="/")
    blogSave = models.CharField(max_length= 300, default="/")
    profile_image = models.URLField(null= True, blank=True, default="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m")
    exerciseLog = models.JSONField(default=dict) #{1:[80, 90, 100], 2:[10, 30, 98]}
    # useravatar = models.Imgfields
    #courseID = models.
    def __str__(self):
        return f"Profile for {self.user.username}"
# Automatically create a profile whenever a new user is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

# Automatically save the profile whenever the user is saved
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class ModelCourse(models.Model):
    name = models.CharField(max_length=100)
    serial = models.CharField(max_length=100)
    bgCardUrl = models.CharField(max_length=200)    
    bgCardUrlSecondary= models.CharField(max_length=200, default="_")
    address = models.CharField(max_length=200)
    duration = models.IntegerField()
    
    description = models.TextField(default = "Follow these simple steps")
    conclusion = models.TextField(default="This is your chance to be at the forefront of AI-driven animation and storytelling with this AI Animation course. You'll receive all the support and inspiration you need as we explore the vast possibilities of AI-enhanced storytelling together. I'm thrilled to guide you through this exciting course – let's begin your adventure in animation with Runway!")
    result = models.TextField(default = "How to animate images with Runway to bring stories to life \n Crafting compelling narratives through ChatGPT \n The variety of animation styles you can achieve with Runway \n The workflow of creating images on Midjourney \n Using AI to organize your entire creative process")
    
    textBook = models.CharField(max_length=100, default= "Streamline Departure")
    color = models.CharField(max_length=40, default="white")
    # progress = models.IntegerField(default=0)
    category = models.ForeignKey("Category", default=1, on_delete=models.CASCADE)
    sale = models.IntegerField(default=0)
    courseKey = models.CharField(max_length = 300, default="")
    # totalStudent = models.IntegerField(default=100)

    #certificate = models.ImageField() #
    


    def __str__(self):
        return self.name




#{"question":"In &quot;Call Of Duty: Zombies&quot;, you can upgrade the &quot;Apothicon Servant&quot; in the &quot;Shadows Of Evil&quot; map.",
# "correct_answer":"True","incorrect_answers":["False"]}


    #session = models.ForeignKey('ModelSession', on_delete=models.CASCADE)
    #icon  #foreignkey relationship


class ModelSession(models.Model):
    course = models.ForeignKey(ModelCourse, on_delete=models.CASCADE)
    overview = models.TextField(null= True, blank=True)
    PPTFileUrl = models.URLField(null= True, blank=True)
    CPTUrl = models.URLField(null= True, blank=True)
    bgCardUrl = models.CharField(max_length=200, null= True, blank=True)
    color= models.CharField(max_length=20, default= 'white', null= True, blank=True)  
   # section = models.ManyToManyField(Section, related_name="Section", blank=True)
    topics = models.CharField(max_length=100, null= True, blank=True, default = "English")
    level = models.CharField(max_length = 70, null= True, blank=True, default = "Beginner")

    #beforeClass = models.ManyToManyField(Section, related_name='before_class_section', blank= True)
    #inClass = models.ManyToManyField(Section, related_name='in_class_section', blank=True)
    #afterClass = models.ManyToManyField(Section, related_name='after_class_section',  blank=True)

    def __str__(self):
        return f"Session {self.id} - Course {self.course.name}"

class Section(models.Model):
    name = models.CharField(max_length = 100, blank=False, null=False)
    content = models.TextField(null= True, blank=False)
    session = models.ForeignKey(ModelSession, on_delete = models.CASCADE, null=True, blank = True)
    
    #questionsJSON = models.JSONField(default = {"questions" : []} )
    def __str__(self):
        return f"Section {self.name}"
class Exercise(models.Model): 
    session = models.ForeignKey(ModelSession, on_delete = models.CASCADE, null=True, blank = True)
    name = models.CharField(max_length = 100, blank=False, null=False)
    bgCardUrl = models.URLField(default = "https://img.freepik.com/free-photo/workplace-with-open-notebook_1101-349.jpg?t=st=1709636664~exp=1709640264~hmac=e0b68f45114336a69e6d5ed40f4f271a4c89bb40012373021542a842501ac5bb&w=826")
    description = models.CharField(max_length = 200, default="")
    instruction = models.TextField(default="")
    type = models.CharField(max_length = 100, default="multiple_choice")
    questions = models.JSONField(default= list)
    def __str__(self):
        return f"{self.name} - {self.session.id}"

    """
[{"question": "In &quot;Call Of Duty: Zombies&quot;, you can upgrade the &quot;Apothicon Servant&quot; in the &quot;Shadows Of Evil&quot; map.", "correct_answer": "False", "incorrect_answers": ["True"]}, {"question": "In IronMan2 answer is True: Zombies&quot;, you can upgrade the &quot;Apothicon Servant&quot; in the &quot;Shadows Of Evil&quot; map.", "correct_answer": "True", "incorrect_answers": ["False"]}]
"""

    """
class Course(models.Model):
    model_course = models.ForeignKey(ModelCourse, on_delete=models.CASCADE)
    teacher = models.CharField(max_length=100)
    dateStart = models.DateField()
    dateEnd = models.DateField()
    gradeBookUrl = models.URLField()
    attendanceExcelUrl = models.URLField()


    
    def __init__(self) :
        return f"{self.name}"
    """

class HomeDetails(models.Model):
    backgroundImageUrl = models.CharField(max_length=200)
    firstViewLine = models.CharField(max_length=100)
    videoUrl =  models.CharField(max_length=200)
    courseBackgroundImageUrl = models.CharField(max_length=200)

#class Teacher(models.Model):
#    pass 

class Blog(models.Model):
    title = models.CharField(max_length = 100)
    url = models.CharField(max_length = 200)
    img = models.CharField(max_length = 200) #option 2 : save the img to the DB
    description = models.CharField(max_length= 100)
    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)

    def __str__(self) -> str:
        return f"{self.title}"

class Campus(models.Model):
    name = models.CharField(max_length= 40)
    address = models.CharField(max_length = 100)

    def __str__(self) -> str:
        return f"{self.name}"
class Contact(models.Model):
    name = models.CharField(max_length = 100)
    message = models.CharField(max_length = 200)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length = 14)
    school = models.CharField(max_length = 70)
    def __str__(self) -> str:
        return f"{self.name}"

    
class Category(models.Model):
    name = models.CharField(max_length=255)
    bannerUrl = models.URLField(default="https://img.freepik.com/free-psd/realistic-roll-up-mock-up_1104-171.jpg?size=626&ext=jpg&uid=R140040626&ga=GA1.1.1279301610.1706777722&semt=ais")
    def __str__(self) -> str:
        return f"{self.name}"

class Question(models.Model):
    TYPE_CHOICES = [
        ('multiple', 'Multiple Choice'),
        ('boolean', 'True/False')
    ]
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard')
    ]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    category = models.ForeignKey(Category, on_delete=models.CASCADE )
    question = models.TextField()
    correct_answer = models.CharField(max_length=100)
    incorrect_answers = models.JSONField()
    def __str__(self) -> str:
        return f"question: {self.id} {self.question}"


