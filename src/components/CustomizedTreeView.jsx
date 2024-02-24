import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import { PlusIcon, MinusIcon, XIcon } from '@heroicons/react/solid';

function TransitionComponent({ show, children }) {
  return (
    <Transition
      show={show}
      enter="transition-all transform ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition-all transform ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      {children}
    </Transition>
  );
}

export default function CustomizedTreeView() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="min-h-[270px] flex-grow max-w-[300px]">
      <div className="overflow-hidden">
        <ul className="space-y-1">
          <li className="pl-4">
            <div className="flex items-center">
              <button
                aria-expanded={isExpanded}
                className="flex-shrink-0 w-5 h-5 mr-1.5 transition duration-150 ease-in-out"
                onClick={toggleExpansion}
              >
                {isExpanded ? (
                  <MinusIcon className="w-full h-full text-gray-500" />
                ) : (
                  <PlusIcon className="w-full h-full text-gray-500" />
                )}
              </button>
              <span>Main</span>
            </div>
            <TransitionComponent show={isExpanded}>
              <ul className="pl-4 space-y-1">
                <li>
                  <span>Hello</span>
                </li>
                <li>
                  <div className="flex items-center">
                    <button
                      aria-expanded={isExpanded}
                      className="flex-shrink-0 w-5 h-5 mr-1.5 transition duration-150 ease-in-out"
                      onClick={toggleExpansion}
                    >
                      <PlusIcon className="w-full h-full text-gray-500" />
                    </button>
                    <span>Subtree with children</span>
                  </div>
                  <TransitionComponent show={isExpanded}>
                    <ul className="pl-4 space-y-1">
                      <li>
                        <span>Child 1</span>
                      </li>
                      <li>
                        <span>Child 2</span>
                      </li>
                      <li>
                        <span>Child 3</span>
                      </li>
                    </ul>
                  </TransitionComponent>
                </li>
                <li>
                  <span>World</span>
                </li>
                <li>
                  <span>Something something</span>
                </li>
              </ul>
            </TransitionComponent>
          </li>
        </ul>
      </div>
    </div>
  );
}
