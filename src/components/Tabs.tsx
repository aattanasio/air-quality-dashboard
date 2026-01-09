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
    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
            <div className="border-b border-gray-100">
                <nav className="flex -mb-px w-full p-1" role="tablist">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            aria-controls={`panel-${tab.id}`}
                            className={`
  flex-1 flex items-center justify-center gap-2 px-2 sm:px-4 py-3.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200
  ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }
`}
                        >
                            <span className={activeTab === tab.id ? 'scale-110' : ''}>{tab.icon}</span>
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
