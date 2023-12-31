
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, FC } from 'react'

import "../main.css";

interface SliderOverProps {
  /**
   * open flag for slider
   */
  open: boolean;
  /**
   * if you want tp place close button on slider.
   */
  crossOnSlider?: boolean
  /**
  * onclose callback
  */
  onClose?: () => void;
  /**
   * chil content in popover
   */
  children: string | JSX.Element;
}

export const SliderOver: FC<SliderOverProps> = ({
  open,
  onClose,
  crossOnSlider,
  children
}) => {

  const closeHandler = () => {
    onClose && onClose()
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeHandler}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className={`${crossOnSlider ? "right-0" : "left-0"} absolute top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4`}>
                      <button
                        type="button"
                        className={`${crossOnSlider ? "text-gray-500 hover:text-gray-700 focus:ring-gray-500" : "text-gray-300 hover:text-white focus:ring-white"} relative rounded-md focus:outline-none focus:ring-2 focus:ring-white`}
                        onClick={closeHandler}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* <div className="px-4 sm:px-6"> */}
                    {children}
                    {/* <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                      </Dialog.Title> */}
                    {/* </div> */}
                    {/* <div className="relative mt-6 flex-1 px-4 sm:px-6">Your content</div> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
