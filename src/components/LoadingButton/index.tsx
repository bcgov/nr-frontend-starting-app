import React from 'react';

import {
  Button,
  InlineLoading
} from '@carbon/react';

import './styles.css';

// The clickFn must provide a return to informing if the action
// was successful or not, so the loading component can be properly
// adjusted
interface ButtonProps {
  clickFn: Function,
  status: {
    loading: String,
    success: String,
    error: String
  },
  label: String,
  icon?: JSX.Element
}

const LoadingButton = ({
  clickFn,
  status,
  label,
  icon
}: ButtonProps) => {
  const [loading, setLoading] = React.useState(false);
  const [loadDesc, setLoadDesc] = React.useState(status.loading);
  const [success, setSuccess] = React.useState('');

  const setLoadingStates = async () => {
    setLoading(true);
    setSuccess('active');

    if (await clickFn()) {
      setSuccess('finished');
      setLoadDesc(status.success);
    } else {
      setSuccess('error');
      setLoadDesc(status.error);
    }

    // Before reseting the value for the next action,
    // set a small timeout to provide the user visual feedback
    setTimeout(() => {
      setLoading(false);
      setLoadDesc(status.loading);
      setSuccess('active');
    }, 1500);
  };

  return (
    <div>
      {
        loading ? (
          <InlineLoading
            className="buttonMargin"
            description={loadDesc}
            status={success}
          />
        ) : (
          <Button
            onClick={() => setLoadingStates()}
            size="md"
            renderIcon={icon}
          >
            {label}
          </Button>
        )
      }
    </div>
  );
};

export default LoadingButton;
