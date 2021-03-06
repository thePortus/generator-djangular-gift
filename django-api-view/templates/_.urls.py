# -*- coding: UTF-8 -*-
"""
Use `urlpatterns` to list both both APIViews and viewsets for this module.

NOTE: __generator-djangular-gift__ may automatically modify this file.
"""

from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.SimpleRouter()

urlpatterns = [
    url(r'^<%= slugifiedName %>/$', views.<%= classifiedName %>View.as_view()),<% if(addGet || addPut || addDelete){ %>
    url(r'^<%= slugifiedName %>/(?P<pk>[0-9]+)/$', views.<%= classifiedName %>View.as_view()),<% } %>
    url(r'^', include(router.urls)),
]
