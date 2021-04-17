import styled from 'styled-components';

interface Props {
  isLoading: boolean;
}

const ChartHolder = styled.div`
  position: relative;
  overflow-x: scroll;
  max-width: 100vw;
  opacity: ${(props: Props) => props.isLoading ? .5 : 1};
`

export {
  ChartHolder
}
