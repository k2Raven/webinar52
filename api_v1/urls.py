from django.urls import path
from api_v1.views import AddView

app_name = 'api_v1'

urlpatterns = [
    path('add/', AddView.as_view(), name='add')
]
