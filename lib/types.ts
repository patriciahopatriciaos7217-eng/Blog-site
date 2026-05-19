export interface User{
    _id?: string;
    username: string;
    password: string;
    email: string;
}

export interface Blog{
    _id?: string;
    title: string;
    content: string;
    author: string;
    imageUrl: string;
    category: string;
    created_at: string;
}

export interface Session {
  userId: string;
  email: string;
  avatar: string;
  username: string;
}