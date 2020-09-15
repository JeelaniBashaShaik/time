export interface Post extends PostDetails {
    postText: string;
    postImageUrl: string;
    postAudioUrl: string;
    postVideoUrl: string;
}

interface PostDetails {
    photoUrl: string;
    profileName: string;
    postType: 'textPost' | 'imagePost' | 'audioPost' | 'videoPost';
    postedOn: Date;
    likes: Likes;
    postedBy: string;
    comments: Comments[];
}

interface Likes {
    count: number;
    likedBy: string[];
}

interface Comments {
    comment: string;
    commentedBy: string;
    commentedTimestamp: Date;
}


