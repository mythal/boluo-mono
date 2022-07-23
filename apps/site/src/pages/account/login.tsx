import { useIntl } from 'react-intl';
import { Title } from '../../components/global/Title';
import { LoginForm } from '../../components/LoginForm';
import type { SwrFallbackProps } from '../../helper/SwrProps';

interface Props extends SwrFallbackProps {}
const Login = ({}: Props) => {
  const intl = useIntl();
  const pageName = intl.formatMessage({ defaultMessage: 'Login' });
  return (
    <>
      <Title name={pageName} />
      <div className="flex h-screen items-start justify-center pt-[20vh]">
        <LoginForm className="min-w-[20rem] max-w-[90vw] rounded border bg-neutral-50 p-6 shadow-1 shadow-gray-300/75" />
      </div>
    </>
  );
};

export default Login;
