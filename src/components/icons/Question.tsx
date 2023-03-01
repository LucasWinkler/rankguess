import type { FC } from 'react';

interface QuestionProps {
  className?: string;
}

const Question: FC<QuestionProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width='17'
      height='17'
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8.5 15.7379C12.4975 15.7379 15.7381 12.4973 15.7381 8.49981C15.7381 4.50232 12.4975 1.26172 8.5 1.26172C4.50251 1.26172 1.2619 4.50232 1.2619 8.49981C1.2619 12.4973 4.50251 15.7379 8.5 15.7379Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.49998 9.40444V8.49968L9.77932 7.22034C10.1187 6.88107 10.3094 6.42089 10.3095 5.94101V5.78539C10.3095 5.23077 9.99646 4.72411 9.50065 4.4762L9.30884 4.3803C9.05768 4.25479 8.78076 4.18945 8.49998 4.18945C8.21921 4.18945 7.94229 4.25479 7.69113 4.3803L7.59522 4.42825C7.0406 4.70511 6.69046 5.27239 6.69046 5.89215V6.69015'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.50001 13.0234C8.99969 13.0234 9.40477 12.6183 9.40477 12.1186C9.40477 11.6189 8.99969 11.2139 8.50001 11.2139C8.00032 11.2139 7.59525 11.6189 7.59525 12.1186C7.59525 12.6183 8.00032 13.0234 8.50001 13.0234Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default Question;
