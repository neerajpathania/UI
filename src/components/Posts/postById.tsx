import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, likePost } from '../../services/slices/components/blogs';
import FavoriteIcon from '@mui/icons-material/Favorite';

const BlogPostDetail = () => {
    const dispatch: any = useDispatch();
    const post = useSelector((state: any) => state.Post?.posts) || [];
    const [loading, setLoading] = useState(true);
    const [like, setLike] = useState(false);

    const blogId = useParams();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                dispatch(getPostById(blogId)); // Fetch the post
                setLike(post?.likes?.includes(userId) || false); // Set the like state
            } catch (error) {
                console.error("Failed to fetch post", error);
            } finally {
                setLoading(false); // Set loading false after fetching
            }
        }

        fetchPost();
    }, [dispatch, blogId, post, userId]);

    const onLike = async () => {
        try {
            await dispatch(likePost({ blogId, userId })).unwrap();
            // Toggle like state locally
            setLike(!like);
            // Optionally, you can fetch the post again to update likes count
            dispatch(getPostById(blogId));
        } catch (error) {
            console.error("Failed to like post", error);
        }
    }

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" variant="success" />
                <p>Loading post...</p>
            </div>
        );
    }

    if (!post) {
        return <p>Post not found</p>;
    }

    return (
        <Container className="my-5">
            <Button variant="secondary" href="/">
                Back to Posts
            </Button>

            <Row>
                <Col md={8} className='rounded blogArea mt-5'>
                    <div className="content">
                        <h1 className="mt-4 text-center">{post.title}</h1>

                        <img
                            src={post.image}
                            alt={post.title}
                            className="img-fluid my-4"
                        />

                        <p>{post.content}</p>
                        <div className="my-3">
                            <button
                                type="button"
                                onClick={onLike}
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                <FavoriteIcon className={like ? "text-danger" : ""} />
                                {post.likes?.length || 0}
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default BlogPostDetail;
