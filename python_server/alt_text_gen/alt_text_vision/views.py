from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponse
from django.http import JsonResponse
import json
import codecs


def image_vision(request):
    reader = codecs.getreader("utf-8")
    post_data = json.load(reader(request))     
    output = {}
    index = 0
    for image in post_data:
        output[index] = { 
            'alt' : image['alt'] + ' : image analysis for src: ' + image['src'],
            'src' : image['src'],
        }
        index += 1
    return JsonResponse(output)

class HomeView(TemplateView):

    template_name = 'index.html'



