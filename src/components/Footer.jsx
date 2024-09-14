const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-4 text-center absolute bottom-0 w-full'>
      <p className='text-lg'>
        - Created with love by{" "}
        <a
          href='https://abhinav-chdhary.github.io/my-portfolio/'
          className='text-yellow-400 hover:text-yellow-500 transition-colors'
          target='_blank'
          rel='noopener noreferrer'
        >
          Abhinav🧙‍♂️
        </a>{" "}
        -
      </p>
    </footer>
  );
};

export default Footer;
