import Button from '../ui/Button.astro'
import Container from '../ui/Container.astro'
import Paragraph from '../ui/Paragraph.astro'
import ByNumber from '../ByNumber.astro'

export function AboutTitle() {
  return (
    <>
      <section className='relative pt-32 lg:pt-10'>
        <Container classNameName={'flex flex-col lg:flex-row gap-10 lg:gap-12'}>
          <div className='absolute w-full lg:w-1/2 inset-y-0 lg:right-0'>
            <span className='absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl dark:bg-primary-700 bg-secondary-950 blur-xl opacity-60 lg:opacity-95 lg:block'></span>
            <span className='absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-primary-700 blur-xl opacity-80'></span>
          </div>
          <span className='w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-primary-700 to-accent-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90'></span>
          <div className='relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2'>
            <h1 className='text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1'>
              Social Media{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-primary-700 via-30% to-accent-400 bold'>
                Marketing
              </span>{' '}
              is the Best Ever.
            </h1>
            <Paragraph classNameName='mt-8'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
              repellat perspiciatis aspernatur quis voluptatum porro incidunt,
              libero sequi quos eos velit
            </Paragraph>
            <div className='mt-10 w-full flex max-w-md mx-auto lg:mx-0'>
              <div className='flex mx-0 sm:flex-row flex-col gap-5 w-full max-lg:justify-center lg:justufy-center'>
                <Button
                  variant={'secondary'}
                  classNameName={'min-w-max text-black dark:text-white'}
                >
                  <span>Comenzar</span>
                </Button>
                <Button
                  variant={'secondary'}
                  classNameName={'min-w-max text-black dark:text-white'}
                >
                  <span> Conocer Mas</span>
                </Button>
              </div>
            </div>
          </div>

          <div className='flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-none lg:mx-0 mx-auto max-w-3xl'>
            <img
              src='/images/web-design.webp'
              alt='Hero image'
              width='2350'
              height='2359'
              className='lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-none max-h-96'
            />
          </div>
        </Container>
        <ByNumber />
      </section>
    </>
  )
}
