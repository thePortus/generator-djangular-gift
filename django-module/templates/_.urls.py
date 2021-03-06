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
    url(r'^', include(router.urls)),
]
