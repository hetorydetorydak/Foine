import React, { useState } from 'react';
import styled from 'styled-components';
import { AppBar, Logo, RightNav } from '../components/AppBar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  
  // Static user data
  const [formData, setFormData] = useState({
    username: 'artist123',
    displayName: 'Artist Name',
    bio: 'digital artist | coffee lover | travel enthusiast',
    website: 'https://myportfolio.com',
    email: 'artist@example.com',
    phone: '+1 (555) 123-4567'
  });
  
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would make an API call here
    console.log('Saving profile data:', { ...formData, profilePicture });
    alert('Profile updated successfully!');
    navigate('/profile');
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <>
      <AppBar>
        <Logo>Foine</Logo>
        <RightNav>
          <Button variant="text" onClick={() => navigate('/landing')}>
            Gallery
          </Button>
          <Button variant="text" onClick={() => navigate('/profile')}>
            Profile
          </Button>
        </RightNav>
      </AppBar>

      <EditProfileContainer>
        <EditProfileCard>
          <PageHeader>
            <PageTitle>Edit Profile</PageTitle>
            <PageSubtitle>Update your personal information and preferences</PageSubtitle>
          </PageHeader>

          <Form onSubmit={handleSubmit}>
            <ProfilePictureSection>
              <SectionTitle>Profile Picture</SectionTitle>
              <PictureContainer>
                <ProfilePicturePreview>
                  {previewImage ? (
                    <img src={previewImage} alt="Profile preview" />
                  ) : (
                    <BlankProfile>
                      <UserIcon>👤</UserIcon>
                    </BlankProfile>
                  )}
                </ProfilePicturePreview>
                <FileInputContainer>
                  <FileInput
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Button variant="outline" as="span">
                    Change Photo
                  </Button>
                  <FileHint>JPG, PNG recommended. Max 5MB.</FileHint>
                </FileInputContainer>
              </PictureContainer>
            </ProfilePictureSection>

            <FormSection>
              <SectionTitle>Personal Information</SectionTitle>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    placeholder="Enter your display name"
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label htmlFor="bio">Bio</Label>
                <TextArea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell everyone about yourself..."
                  rows="3"
                  maxLength="150"
                />
                <CharCount>{formData.bio.length}/150</CharCount>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="website">Website</Label>
                <Input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </FormGroup>
              </FormRow>
            </FormSection>

            <ActionButtons>
              <Button variant="outline" type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </ActionButtons>
          </Form>
        </EditProfileCard>
      </EditProfileContainer>
    </>
  );
};

export default EditProfile;

const EditProfileContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 5rem 1rem 2rem;
`;

const EditProfileCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const PageHeader = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e9ecef;
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #262626;
  margin: 0 0 0.5rem 0;
`;

const PageSubtitle = styled.p`
  color: #6c757d;
  margin: 0;
  font-size: 0.9rem;
`;

const Form = styled.form`
  padding: 0;
`;

const ProfilePictureSection = styled.div`
  padding: 2rem;
  border-bottom: 1px solid #e9ecef;
`;

const FormSection = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #262626;
  margin: 0 0 1.5rem 0;
`;

const PictureContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ProfilePicturePreview = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid #e9ecef;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BlankProfile = styled.div`
  width: 100%;
  height: 100%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserIcon = styled.span`
  font-size: 3rem;
  opacity: 0.3;
`;

const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FileInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const FileHint = styled.span`
  font-size: 0.8rem;
  color: #6c757d;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #262626;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: border 0.3s ease;

  &:focus {
    outline: none;
    border-color: #003B5C;
    box-shadow: 0 0 0 3px rgba(0, 59, 92, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const CharCount = styled.span`
  display: block;
  text-align: right;
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.25rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;