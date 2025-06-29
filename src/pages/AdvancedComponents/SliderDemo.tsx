import { useState } from 'preact/hooks';

import { Slider } from '../../components/Slider';
import { Card } from '../../components/Card';

export function SliderDemo() {
  const [singleValue, setSingleValue] = useState(50);
  const [stepValue, setStepValue] = useState(5);
  const [disabledValue] = useState(30);

  return (
    <Card>
      <h2>Slider Component Demo</h2>
      <p>Material Design 3 Slider with smooth interactions</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>Basic Slider</h3>
          <Slider
            value={singleValue}
            onChange={(value) => setSingleValue(value)}
            min={0}
            max={100}
            label="Volume"
          />
          <p>Value: {singleValue}</p>
        </div>

        <div>
          <h3>Step Slider</h3>
          <Slider
            value={stepValue}
            onChange={(value) => setStepValue(value)}
            min={0}
            max={10}
            step={1}
            showTicks
            label="Rating"
          />
          <p>Rating: {stepValue}/10</p>
        </div>

        <div>
          <h3>Disabled Slider</h3>
          <Slider value={disabledValue} min={0} max={100} disabled label="Locked Setting" />
          <p>Value: {disabledValue}</p>
        </div>

        <div>
          <h3>Vertical Slider</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'center' }}>
            <Slider
              value={singleValue}
              onChange={(value) => setSingleValue(value)}
              min={0}
              max={100}
              orientation="vertical"
              label="Vertical Volume"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
