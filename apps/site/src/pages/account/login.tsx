import { useIntl } from 'react-intl';
import { ErrorBoundary } from 'ui';
import { Title } from '../../components/global/Title';
import { LoginForm } from '../../components/LoginForm';

const Login = () => {
  const intl = useIntl();
  const pageName = intl.formatMessage({ defaultMessage: 'Login' });
  return (
    <>
      <Title>{pageName}</Title>
      <div className="flex h-screen items-start justify-center pt-[20vh]">
        <div className="min-w-[20rem] max-w-[90vw] rounded border bg-lowest p-6 shadow-1 shadow-gray-300/75">
          <ErrorBoundary>
            <LoginForm />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default Login;
