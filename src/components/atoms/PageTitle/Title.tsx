import { Heading, majorScale } from 'evergreen-ui';

interface TitleProps {
  children: React.ReactNode;
}

const Title = (props: TitleProps) => (
  <Heading
    size={700}
    marginTop={majorScale(2)}
    marginBottom={majorScale(1)}
  >
      {props.children}
  </Heading>
);

export default Title;
