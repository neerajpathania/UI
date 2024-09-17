import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, getPosts } from '../../services/slices/components/blogs';

const BlogPostDetail = () => {
    const dispatch: any = useDispatch();
    const post: any = useSelector((state: any) => state.Post?.posts) || []
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])

    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    const blogId = useParams()
    console.log(blogId, "{{{{{{{{{{{{{{{{{{{{{{")

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            if (blogId) {
                try {
                    await dispatch(getPostById(blogId)); // Wait for the post to be fetched
                } catch (error) {
                    console.error("Failed to fetch post", error);
                } finally {
                    setLoading(false); // Set loading false after the post is fetched
                }
            }
        }

        fetchPost();
    }, [dispatch, blogId]);

    if (!post) {
        return <p>Post not found</p>; // Handle case where post is not found
    }

    return (
        <Container className="my-5">
            <Button variant="secondary" href="/">
                Back to Posts
            </Button>

            <Row>
                <Col md={8}>
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" variant="success" />
                            <p>Loading post...</p>
                        </div>
                    ) : post ? (
                        <div className="content">
                            <h1 className="mt-4">{post.title}</h1>

                            <img
                                src={post.image}
                                alt={post.title}
                                className="img-fluid my-4"
                            />

                            <p>{post.content}</p>
                        </div>
                    ) : (
                        <p>Post not found</p>
                    )}
                </Col>


            </Row>
        </Container >
    );
};

export default BlogPostDetail;
