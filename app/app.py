from fastapi import FastAPI, HTTPException
from app.schemas import PostCreate, PostResponse
from app.db import Post, create_db_and_tables, get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

text_posts = {
    1: {"title": "New Post", "content": "This is my new post"},
    2: {"title": "Python Tips", "content": "Learn Python the easy way"},
    3: {"title": "FastAPI Tutorial", "content": "Building REST APIs with FastAPI"},
    4: {"title": "Web Development", "content": "Modern web development practices"},
    5: {"title": "Database Design", "content": "Best practices for database design"},
    6: {"title": "API Security", "content": "Securing your REST APIs"},
    7: {"title": "Testing Guide", "content": "How to write effective tests"},
    8: {"title": "Docker Basics", "content": "Containerizing your applications"},
    9: {"title": "Cloud Deployment", "content": "Deploying apps to the cloud"},
    10: {"title": "Performance Optimization", "content": "Making your code faster"}
}

@app.get('/posts')
def get_all_posts(limit:int): # Es opcional si pongo None
    if limit:
        return list(text_posts.values())[:limit]
    return text_posts

@app.get('/posts/{id}')
def get_post(id:int) -> PostResponse:
    if id not in text_posts:
        raise HTTPException(status_code=404, detail="Post not found")
    return text_posts.get(id)

@app.post('/post')
def create_post(post: PostCreate) -> PostResponse:
    new_post = {"title": post.title, "content": post.content}
    text_posts[max(text_posts.keys()) + 1] = new_post
    return new_post
