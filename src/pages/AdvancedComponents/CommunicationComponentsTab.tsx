import { SnackbarDemo } from './SnackbarDemo';
import { TooltipDemo } from './TooltipDemo';
import { BadgeDemo } from './BadgeDemo';
import { BannerDemo } from './BannerDemo';
import { DialogDemo } from './DialogDemo';

export function CommunicationComponentsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3>💬 Communication Components</h3>
      <SnackbarDemo />
      <TooltipDemo />
      <BadgeDemo />
      <BannerDemo />
      <DialogDemo />
    </div>
  );
}
