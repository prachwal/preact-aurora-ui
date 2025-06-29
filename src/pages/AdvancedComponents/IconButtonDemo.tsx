import { useState } from 'preact/hooks';

import {
  IconButton,
  HeartIcon,
  StarIcon,
  BookmarkIcon,
  EditIcon,
  DeleteIcon,
  ShareIcon,
  MoreIcon,
  CloseIcon,
} from '../../components/IconButton';

export function IconButtonDemo() {
  const [heartLiked, setHeartLiked] = useState(false);
  const [starSelected, setStarSelected] = useState(false);
  const [bookmarkSaved, setBookmarkSaved] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>🎯 IconButton Component</h4>
        <p>Material Design 3 icon buttons with multiple variants and toggle functionality.</p>
      </div>

      {/* Basic Variants */}
      <div>
        <h5>Variants</h5>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <IconButton variant="standard" icon={<EditIcon />} aria-label="Edit (Standard)" />
            <div>
              <small>Standard</small>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IconButton variant="filled" icon={<EditIcon />} aria-label="Edit (Filled)" />
            <div>
              <small>Filled</small>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IconButton variant="outlined" icon={<EditIcon />} aria-label="Edit (Outlined)" />
            <div>
              <small>Outlined</small>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IconButton variant="tonal" icon={<EditIcon />} aria-label="Edit (Tonal)" />
            <div>
              <small>Tonal</small>
            </div>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h5>Sizes</h5>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <IconButton size="small" icon={<ShareIcon />} aria-label="Share (Small)" />
            <div>
              <small>Small</small>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IconButton size="medium" icon={<ShareIcon />} aria-label="Share (Medium)" />
            <div>
              <small>Medium</small>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IconButton size="large" icon={<ShareIcon />} aria-label="Share (Large)" />
            <div>
              <small>Large</small>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Functionality */}
      <div>
        <h5>Toggle IconButtons (Interactive)</h5>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <IconButton
              toggle
              selected={heartLiked}
              onToggle={setHeartLiked}
              selectedIcon={<HeartIcon filled />}
              unselectedIcon={<HeartIcon />}
              aria-label={heartLiked ? 'Unlike' : 'Like'}
            />
            <div>
              <small>{heartLiked ? 'Liked ❤️' : 'Not liked'}</small>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <IconButton
              toggle
              variant="tonal"
              selected={starSelected}
              onToggle={setStarSelected}
              selectedIcon={<StarIcon filled />}
              unselectedIcon={<StarIcon />}
              aria-label={starSelected ? 'Unstar' : 'Star'}
            />
            <div>
              <small>{starSelected ? 'Starred ⭐' : 'Not starred'}</small>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <IconButton
              toggle
              variant="outlined"
              selected={bookmarkSaved}
              onToggle={setBookmarkSaved}
              selectedIcon={<BookmarkIcon filled />}
              unselectedIcon={<BookmarkIcon />}
              aria-label={bookmarkSaved ? 'Remove bookmark' : 'Bookmark'}
            />
            <div>
              <small>{bookmarkSaved ? 'Saved 📖' : 'Not saved'}</small>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div>
        <h5>Action Buttons</h5>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconButton
            variant="standard"
            icon={<EditIcon />}
            aria-label="Edit"
            onClick={() => alert('Edit clicked!')}
          />

          <IconButton
            variant="filled"
            icon={<DeleteIcon />}
            aria-label="Delete"
            onClick={() => alert('Delete clicked!')}
          />

          <IconButton
            variant="tonal"
            icon={<ShareIcon />}
            aria-label="Share"
            onClick={() => alert('Share clicked!')}
          />

          <IconButton
            variant="outlined"
            icon={<MoreIcon />}
            aria-label="More options"
            onClick={() => alert('More options clicked!')}
          />

          <IconButton
            variant="standard"
            icon={<CloseIcon />}
            aria-label="Close"
            onClick={() => alert('Close clicked!')}
          />
        </div>
      </div>

      {/* Disabled State */}
      <div>
        <h5>Disabled State</h5>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconButton
            variant="standard"
            disabled
            icon={<EditIcon />}
            aria-label="Edit (Disabled)"
          />
          <IconButton
            variant="filled"
            disabled
            icon={<DeleteIcon />}
            aria-label="Delete (Disabled)"
          />
          <IconButton
            variant="outlined"
            disabled
            icon={<ShareIcon />}
            aria-label="Share (Disabled)"
          />
          <IconButton variant="tonal" disabled icon={<MoreIcon />} aria-label="More (Disabled)" />
        </div>
      </div>

      {/* Custom Icons */}
      <div>
        <h5>Custom Content</h5>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconButton variant="standard" aria-label="Emoji heart">
            ❤️
          </IconButton>
          <IconButton variant="filled" aria-label="Emoji star">
            ⭐
          </IconButton>
          <IconButton variant="outlined" aria-label="Number one">
            <strong>1</strong>
          </IconButton>
          <IconButton variant="tonal" aria-label="Letter A">
            <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>A</span>
          </IconButton>
        </div>
      </div>

      {/* Usage Notes */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-variant)',
          padding: '1rem',
          borderRadius: '8px',
        }}
      >
        <h5>🎯 Key Features</h5>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>
            <strong>Four variants:</strong> Standard, Filled, Outlined, Tonal
          </li>
          <li>
            <strong>Three sizes:</strong> Small (32px), Medium (40px), Large (48px)
          </li>
          <li>
            <strong>Toggle support:</strong> Different icons for selected/unselected states
          </li>
          <li>
            <strong>Full accessibility:</strong> ARIA labels, keyboard navigation
          </li>
          <li>
            <strong>Material Design 3:</strong> Follows official MD3 specifications
          </li>
        </ul>
      </div>
    </div>
  );
}
