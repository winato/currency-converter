import styled from 'styled-components';

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: .5rem;
  text-align: center;
`;

const StyledForm = styled.div`
  margin-bottom: 3rem;
`

const Equal = styled.div`
  font-size: 2rem;
  font-weight: bold;
`

const Select = styled.select`
  font-size: 1.5em;
  border-radius: 3rem;
  border: 1px solid #59c2ff;
  outline: none;
  margin: .5rem;
  padding: .5rem;
  width: 100%;
  max-width: 275px;
  color: #121212;
  @media (min-width: 768px) {
    max-width: 100px;
  }
`;

const Input = styled.input`
  font-size: 1.5em;
  border-radius: 3rem;
  border: 1px solid #59c2ff;
  outline: none;
  margin: .5rem;
  padding: .5rem;
  width: 100%;
  max-width: 275px;
  color: #121212;
  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }
  ::-webkit-outer-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }  
`;

export {
  Equal,
  Title,
  Select,
  Input,
  StyledForm,
}
