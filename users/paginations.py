from rest_framework.pagination import (
    PageNumberPagination,
    LimitOffsetPagination,
)


class UserPageNumberPagination(PageNumberPagination):
    page_size = 5


class UserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 5
