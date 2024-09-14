import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editPasswords, editProfile, profileData } from "../../services/slices/auth/login";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
    const dispatch: any = useDispatch()
    const navigate = useNavigate()

    const [key, setKey] = useState<any>('profile');
    const [editName, setEditName] = useState("")
    const [editEmail, setEditEmail] = useState("")
    const [editPassword, setEditPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const userId = localStorage.getItem("userId")

    useEffect(() => {
        dispatch(profileData({ userId }))
            .unwrap()
            .then((res: any) => {
                setEditName(res?.name || "");  // Set editable name
                setEditEmail(res?.email || "");
                // setEditPassword(res?.password || "")
            })
    }, [dispatch, userId])

    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
        clearErrors
    } = useForm({
        mode: "onChange"
    });

    const onSubmit = () => {
        const formData = {
            userId,
            name: editName,
            email: editEmail,
        };
        dispatch(editProfile(formData))
            .unwrap()
            .then((res: any) => {
                console.log(res.status)
                if (res.success) {
                    toast.success("Profile Updated Successfully")
                    navigate('/profile')
                } else {
                    toast.error("Failed to Update Profile")
                }
            })
    }

    const handlePasswordChange = () => {
        if (editPassword && confirmPassword && editPassword !== confirmPassword) {
            setError("confirmPassword", { type: "manual", message: "Passwords do not match" });
            return;
        } else {
            clearErrors("confirmPassword");
        }
        const formData = {
            userId,
            currentPassword: currentPassword,
            newPassword: editPassword
        };
        dispatch(editPasswords(formData))
            .unwrap()
            .then((res: any) => {
                console.log(res.status)
                if (res.success) {
                    toast.success("Password Updated Successfully")
                    navigate('/profile')
                } else {
                    toast.error("Incorrect Confirm Password")
                }
            })
    }

    return (
        <Container className="my-5">
            <h2 className="mb-4">Settings</h2>
            <Tabs
                id="settings-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="profile" title="Profile Settings">
                    <Card>
                        <Card.Body>
                            <h5>Update Profile Information</h5>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="formProfileName" className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" value={editName} onChange={(e) => setEditName(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formProfileEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="account" title="Account Settings">
                    <Card>
                        <Card.Body>
                            <h5>Manage Account</h5>
                            <Form onSubmit={handleSubmit(handlePasswordChange)}>
                                <Form.Group controlId="formAccountCurrentPassword" className="mb-3 position-relative">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control type={showCurrentPassword ? "text" : "password"} placeholder="Enter Your Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                    {errors.currentPassword && <span className="text-danger">{errors?.currentPassword?.message?.toString()}</span>}
                                    <span
                                        className=" position-absolute end-0 translate-middle-y me-2 adjust"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                        {showCurrentPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </span>
                                </Form.Group>
                                <Form.Group controlId="formAccountPassword" className="mb-3 position-relative">
                                    <Form.Label>Change Password</Form.Label>

                                    {errors.newPassword && <span className="text-danger">Password must be at least 6 characters long</span>}<Form.Control type={showNewPassword ? "text" : "password"} placeholder="Enter new password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />
                                    <span
                                        className="position-absolute end-0 translate-middle-y me-2 adjust"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </span>
                                </Form.Group>
                                <Form.Group controlId="formAccountConfirmPassword" className="mb-3 position-relative ">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control type={showConfirmPassword ? "text" : "password"} placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    {errors.confirmPassword && <span className="text-danger">{errors?.confirmPassword?.message?.toString()}</span>}
                                    <span
                                        className="position-absolute end-0 translate-middle-y me-2 adjust"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </span>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default SettingsPage;
