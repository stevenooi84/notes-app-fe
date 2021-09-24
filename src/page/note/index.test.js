
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import '@testing-library/jest-dom'
import { get, put, post } from '../../helper/fetch';
import NotePage from '.'

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
      id: '1',
    }),
  }));

jest.mock('../../helper/fetch');
get.mockResolvedValue({});
  
const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  }),
)


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays NotePage with id', async () => {
  render(<NotePage />)
  expect(screen.getByTestId("box")).toBeInTheDocument();
  expect(screen.getByTestId("textfield-content")).toBeInTheDocument();
  expect(screen.getByTestId("textfield-tag")).toBeInTheDocument();
  expect(screen.getByTestId("button-submit")).toBeInTheDocument();
  expect(get).toBeCalled();
})

test('loads and displays NotePage without id', async () => {
    jest.mock('react-router', () => ({
        ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
        useParams: () => ({}),
      }));
    render(<NotePage />)
    expect(screen.getByTestId("box")).toBeInTheDocument();
    expect(screen.getByTestId("textfield-content")).toBeInTheDocument();
    expect(screen.getByTestId("textfield-tag")).toBeInTheDocument();
    expect(screen.getByTestId("button-submit")).toBeInTheDocument();
    expect(get).toBeCalled();
  })
  