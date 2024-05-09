import React from "react";
import { Icons, UI } from "./kit";

type SidebarProps = {
    children?: React.ReactNode;
    title?: React.ReactNode;
    tools?: React.ReactNode;
    /**
     * "resize" - закрывается и открывается с анимацией изменения ширины
     * "translate" - без анимации изменения ширины (для нагруженных интерфейсов)
     */
    variant?: 'resize' | 'translate'
    hideDirection?: 'left' | 'right';
    transitionClasses?: string;
}

export function Sidebar({
    children,
    title,
    tools,
    hideDirection = 'left',
    variant = 'resize',
    transitionClasses: innerTransitionClasses,
}: SidebarProps) {
    const [isOpen, setIsShown] = React.useState(true);

    const handleToggle = React.useCallback(() => {
        setIsShown((prev) => !prev);
    }, []);

    const duration = variant === 'resize'
        ? 'duration-200'
        : 'duration-300';
    const transitionClasses = innerTransitionClasses || `${duration} ease-in-out`;

    let relativeContainerClasses = 'h-full';

    if (variant === 'resize') {
        relativeContainerClasses += ` relative transition-[width] ${transitionClasses}`;
    }

    if (isOpen) {
        relativeContainerClasses += ' w-52';
    } else {
        relativeContainerClasses += ' w-12';
    }

    let absoluteContainerClasses = `w-52 h-full bg-white border-r border-gray-200 shadow-sm transition ${transitionClasses}`;

    if (variant === 'resize') {
        absoluteContainerClasses += ' absolute top-0 bottom-0';

        if (hideDirection === 'left') {
            absoluteContainerClasses += ' left-auto right-0';
        }

        if (hideDirection === 'right') {
            absoluteContainerClasses += ' left-0 right-auto';
        }
    }

    if (variant === 'translate' && !isOpen) {
        absoluteContainerClasses += ' transform';

        if (hideDirection === 'left') {
            absoluteContainerClasses += ' -translate-x-40';
        }

        if (hideDirection === 'right') {
            absoluteContainerClasses += ' translate-x-40';
        }
    }

    let contentClasses = `transition-[opacity] ${transitionClasses}`;
    if (!isOpen) {
        contentClasses += ' transform opacity-0';
    }

    let buttonClasses = transitionClasses;
    if (!isOpen) {
        buttonClasses += ' transform -rotate-180';
    }

    return (
        <div style={{ zIndex: 5 }} className={relativeContainerClasses}>
            <div className={absoluteContainerClasses}>
                <div className="flex flex-col h-full">
                    <div className={`flex p-1 flex-row ${hideDirection === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`${contentClasses} text-lg font-medium`}>
                            {title}
                        </div>
                        <div className={`flex grow ${hideDirection === 'right' ? 'justify-start' : 'justify-end'}`}>
                            {tools}
                            <UI.Button
                                isIconOnly
                                variant="light"
                                onClick={handleToggle}
                                className={`${buttonClasses} text-gray-500`}
                            >
                                {
                                    hideDirection === 'right'
                                        ? <Icons.RightOutlined/>
                                        : <Icons.LeftOutlined/>
                                }
                            </UI.Button>
                        </div>
                    </div>
                    <div className={`w-full grow overflow-y-auto ${contentClasses}`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
