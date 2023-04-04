import { Box, Slider, TextField } from '@mui/material';
import { Size } from '../../common-types';
type SidebarProps = {
  boxSize: Size;
  onChange: React.ComponentProps<typeof TextField>['onChange'];
};

export function Sidebar({ boxSize, onChange }: SidebarProps) {
  return (
    <div>
      <TextField
        type="number"
        label="width"
        name="width"
        variant="outlined"
        size="small"
        value={boxSize.width}
        inputProps={{ step: 1 }}
        onChange={onChange}
      />

      <Slider name="width" min={1} max={400} step={1} value={boxSize.width} onChange={onChange as any} />
      <hr />
      <br />
      <TextField
        type="number"
        label="height"
        name="height"
        variant="outlined"
        size="small"
        value={boxSize.height}
        inputProps={{ step: 1 }}
        onChange={onChange}
      />
      <Slider name="height" min={1} max={400} step={1} value={boxSize.height} onChange={onChange as any} />
    </div>
  );
}
