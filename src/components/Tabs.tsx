import type { ReactNode } from 'react';

interface Tab {
    id: string;
    label: string;
    icon?: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="border-b border-gray-100">
                <nav className="flex -mb-px w-full p-1 relative" role="tablist">
                    {/* Sliding background indicator */}
                    <div
                        className="absolute inset-y-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md transition-all duration-500 ease-in-out"
                        style={{
                            width: `calc(${100 / tabs.length}% - 0.5rem)`,
                            transform: `translateX(calc(${activeIndex * 100}% + 0.25rem))`,
                        }}
                    />

                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            aria-controls={`panel-${tab.id}`}
                            className={`
  flex-1 flex items-center justify-center gap-2 px-2 sm:px-4 py-3.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 relative z-10
  ${activeTab === tab.id
                                    ? 'text-white'
                                    : 'text-gray-600'
                                }
`}
                        >
                            <span className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : ''}`}>{tab.icon}</span>
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
