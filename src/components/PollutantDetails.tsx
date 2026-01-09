import { Wind, Droplets, Flame, Cloud } from 'lucide-react';

interface PollutantDetailsProps {
    pollutants: {
        co: number;      // Carbon monoxide
        no2: number;     // Nitrogen dioxide
        o3: number;      // Ozone
        so2: number;     // Sulphur dioxide
        pm2_5: number;   // Fine particles
        pm10: number;    // Coarse particles
    };
}

interface PollutantInfo {
    name: string;
    value: number;
    unit: string;
    description: string;
    icon: React.ReactNode;
    level: 'good' | 'moderate' | 'poor';
}

export function PollutantDetails({ pollutants }: PollutantDetailsProps) {
    // Helper function to determine pollution level
    const getPM25Level = (value: number): 'good' | 'moderate' | 'poor' => {
        if (value <= 12) return 'good';
        if (value <= 35.4) return 'moderate';
        return 'poor';
    };

    const getPM10Level = (value: number): 'good' | 'moderate' | 'poor' => {
        if (value <= 54) return 'good';
        if (value <= 154) return 'moderate';
        return 'poor';
    };

    const getNO2Level = (value: number): 'good' | 'moderate' | 'poor' => {
        if (value <= 53) return 'good';
        if (value <= 100) return 'moderate';
        return 'poor';
    };

    const getO3Level = (value: number): 'good' | 'moderate' | 'poor' => {
        if (value <= 54) return 'good';
        if (value <= 70) return 'moderate';
        return 'poor';
    };

    const pollutantData: PollutantInfo[] = [
        {
            name: 'PM2.5',
            value: pollutants.pm2_5,
            unit: 'μg/m³',
            description: 'Fine particles that penetrate deep into lungs',
            icon: <Droplets className="w-5 h-5" />,
            level: getPM25Level(pollutants.pm2_5)
        },
        {
            name: 'PM10',
            value: pollutants.pm10,
            unit: 'μg/m³',
            description: 'Coarse particles from dust and pollen',
            icon: <Cloud className="w-5 h-5" />,
            level: getPM10Level(pollutants.pm10)
        },
        {
            name: 'NO₂',
            value: pollutants.no2,
            unit: 'μg/m³',
            description: 'Nitrogen dioxide from vehicle emissions',
            icon: <Flame className="w-5 h-5" />,
            level: getNO2Level(pollutants.no2)
        },
        {
            name: 'O₃',
            value: pollutants.o3,
            unit: 'μg/m³',
            description: 'Ground-level ozone formed by sunlight',
            icon: <Wind className="w-5 h-5" />,
            level: getO3Level(pollutants.o3)
        }
    ];

    const getLevelColor = (level: 'good' | 'moderate' | 'poor') => {
        switch (level) {
            case 'good':
                return 'bg-green-100 text-green-700 border-green-300';
            case 'moderate':
                return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'poor':
                return 'bg-red-100 text-red-700 border-red-300';
        }
    };

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <Wind className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                    Pollutant Details
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pollutantData.map((pollutant) => (
                    <div
                        key={pollutant.name}
                        className={`
              border-2 rounded-xl p-5 transition-all shadow-sm hover:shadow-md
              ${getLevelColor(pollutant.level)}
            `}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 bg-white/60 rounded-lg">
                                    {pollutant.icon}
                                </div>
                                <h3 className="font-bold text-lg">{pollutant.name}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-extrabold">
                                    {pollutant.value.toFixed(1)}
                                </p>
                                <p className="text-xs font-medium opacity-75">{pollutant.unit}</p>
                            </div>
                        </div>
                        <p className="text-sm opacity-90 leading-relaxed">
                            {pollutant.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Additional pollutants (less important, shown in compact format) */}
            <div className="mt-5 pt-5 border-t border-gray-200">
                <p className="text-sm text-gray-600 font-semibold mb-3">Other pollutants:</p>
                <div className="flex flex-wrap gap-3">
                    <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="font-bold text-gray-700 text-sm">CO:</span>{' '}
                        <span className="text-gray-600 text-sm font-medium">{pollutants.co.toFixed(1)} μg/m³</span>
                    </div>
                    <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="font-bold text-gray-700 text-sm">SO₂:</span>{' '}
                        <span className="text-gray-600 text-sm font-medium">{pollutants.so2.toFixed(1)} μg/m³</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
