import React from 'react';
import styled from 'styled-components';

const PostGrid = ({ posts = [], type = 'posts' }) => {
  // Placeholder posts if none provided
  const displayPosts = posts.length > 0 ? posts : Array.from({ length: 6 }, (_, i) => ({
    id: i,
    type: 'placeholder'
  }));

  const getEmptyMessage = () => {
    switch (type) {
      case 'posts':
        return 'No posts yet';
      case 'saves':
        return 'No saved posts yet';
      default:
        return 'No content yet';
    }
  };

  const getEmptyIcon = () => {
    switch (type) {
      case 'posts':
        return '📱';
      case 'saves':
        return '💾';
      default:
        return '📷';
    }
  };

  if (displayPosts.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon>{getEmptyIcon()}</EmptyIcon>
        <EmptyText>{getEmptyMessage()}</EmptyText>
        {type === 'saves' && (
          <EmptySubtext>Save posts you love to see them here</EmptySubtext>
        )}
      </EmptyState>
    );
  }

  return (
    <GridContainer>
      <PostGridLayout>
        {displayPosts.map(post => (
          <PostItem key={post.id} $isPlaceholder={post.type === 'placeholder'}>
            {post.type === 'placeholder' ? (
              <PlaceholderPost>
                <PlaceholderIcon>🖼️</PlaceholderIcon>
              </PlaceholderPost>
            ) : (
              <PostContent>
                <PostImage src={post.imageUrl} alt={post.caption} />
                <PostOverlay>
                  <PostStats>
                    <Stat>❤️ {post.likes || 0}</Stat>
                    <Stat>💬 {post.comments || 0}</Stat>
                  </PostStats>
                </PostOverlay>
                {type === 'saves' && (
                  <SaveBadge>💾</SaveBadge>
                )}
              </PostContent>
            )}
          </PostItem>
        ))}
      </PostGridLayout>
    </GridContainer>
  );
};

export default PostGrid;

const GridContainer = styled.div`
  max-width: 935px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const PostGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const PostItem = styled.div`
  aspect-ratio: 1;
  background: ${props => props.$isPlaceholder ? '#fafafa' : 'transparent'};
  border: ${props => props.$isPlaceholder ? '1px solid #dbdbdb' : 'none'};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const PlaceholderPost = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
`;

const PlaceholderIcon = styled.span`
  font-size: 2rem;
  opacity: 0.3;
`;

const PostContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${PostItem}:hover & {
    opacity: 1;
  }
`;

const PostStats = styled.div`
  display: flex;
  gap: 1.5rem;
  color: white;
  font-weight: 600;
`;

const Stat = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const SaveBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #8e8e8e;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  margin: 0 0 0.5rem 0;
`;

const EmptySubtext = styled.p`
  font-size: 0.9rem;
  color: #8e8e8e;
  margin: 0;
`;