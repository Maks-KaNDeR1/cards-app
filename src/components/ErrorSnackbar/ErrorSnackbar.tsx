import { Alert } from 'antd';
import React from 'react';
import { useAppDispatch } from '../../utils/hook';

const ErrorSnackBar: React.FC = () => (
  <>
    <Alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
      closable
    />
  </>
);

export default ErrorSnackBar;