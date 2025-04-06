document.addEventListener('DOMContentLoaded', async function() {
    // DOM Elements
    const distanceSlider = document.getElementById('distance');
    const distanceInput = document.getElementById('distance-input');
    const economySlider = document.getElementById('fuel-economy');
    const economyInput = document.getElementById('economy-input');
    const lifespanSlider = document.getElementById('lifespan');
    const lifespanInput = document.getElementById('lifespan-input');
    const fuelPriceEl = document.getElementById('current-fuel-price');
    const calculateBtn = document.getElementById('calculate-btn');
    const lastUpdatedEl = document.createElement('small');
    lastUpdatedEl.className = 'last-updated';
    const dieselPriceEl = document.getElementById('current-diesel-price');
    const dieselUpdatedEl = document.getElementById('diesel-updated');
    fuelPriceEl.parentNode.appendChild(lastUpdatedEl);

    // Chart initialization
    const ctx = document.getElementById('savingsChart').getContext('2d');
    const savingsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Fuel Savings', 'Maintenance Savings', 'Tax Benefits'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: [
                    '#3182ce',
                    '#38a169',
                    '#6f42c1'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Constants
    const constants = {
        electricityCost: 8.5,       // ₹ per kWh (commercial rate)
        evEfficiency: 6.5,          // km per kWh (real-world average)
        annualMaintenanceICE: 18000, // ₹ for conventional vehicles
        annualMaintenanceEV: 6000,   // ₹ for EVs
        annualTaxICE: 5000,         // ₹ average annual tax
        annualTaxEV: 1500,          // ₹ EV tax benefits
        daysDrivenPerYear: 330,     // Accounting for non-driving days
        inflationRate: 0.05         // 5% annual inflation
    };

    // Fuel price state
    let fuelPrices = {
        petrol: 105.41, // Default fallback
        diesel: 94.67   // Default fallback
    };

    // Initialize
    await fetchFuelPrices();
    initSliders();
    calculateSavings();

    // Fetch current fuel prices from API
    async function fetchFuelPrices() {
        try {
            // Note: You'll need to replace this with a real API endpoint
            // Here's a mock implementation for demonstration
            
            // Mock API response (in production, use real API)
            const mockApiResponse = {
                success: true,
                data: {
                    petrol: 105.41 + (Math.random() * 2 - 1), // Simulate small price changes
                    diesel: 94.67 + (Math.random() * 2 - 1)
                },
                last_updated: new Date().toISOString()
            };
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            if (mockApiResponse.success) {
                fuelPrices = mockApiResponse.data;
                const updatedTime = new Date(mockApiResponse.last_updated).toLocaleTimeString();
                lastUpdatedEl.textContent = `Updated at ${updatedTime}`;
                console.log('Fuel prices updated:', fuelPrices);
            }
        } catch (error) {
            console.error("Failed to fetch fuel prices:", error);
            lastUpdatedEl.textContent = "Using cached prices";
        }
    }

    // Initialize sliders and sync with number inputs
    function initSliders() {
        syncInputs(distanceSlider, distanceInput, ' km/day');
        syncInputs(economySlider, economyInput, ' km/l');
        syncInputs(lifespanSlider, lifespanInput, ' years');
        updateFuelPriceDisplay();
    }

    // Sync slider and number inputs
    function syncInputs(slider, input, suffix = '') {
        input.value = slider.value;
        
        slider.addEventListener('input', () => {
            input.value = slider.value;
        });
        
        input.addEventListener('input', () => {
            const val = Math.min(Math.max(input.value, input.min), input.max);
            input.value = val;
            slider.value = val;
        });
    }

    // Update fuel price display
    function updateFuelPriceDisplay() {
        const vehicleType = document.querySelector('input[name="vehicle-type"]:checked').value;
        const price = vehicleType === 'petrol' ? fuelPrices.petrol : fuelPrices.diesel;
        fuelPriceEl.textContent = `₹${price.toFixed(2)}/liter`;
    }

    // Main calculation function
    function calculateSavings() {
        const vehicleType = document.querySelector('input[name="vehicle-type"]:checked').value;
        const dailyDistance = parseFloat(distanceSlider.value);
        const fuelEconomy = parseFloat(economySlider.value);
        const lifespan = parseFloat(lifespanSlider.value);
        const fuelPrice = vehicleType === 'petrol' ? fuelPrices.petrol : fuelPrices.diesel;
        
        const annualDistance = dailyDistance * constants.daysDrivenPerYear;
        
        let totalFuelCost = 0;
        let totalElectricityCost = 0;
        let totalMaintenanceICE = 0;
        let totalMaintenanceEV = 0;
        let totalTaxICE = 0;
        let totalTaxEV = 0;
        
        for (let year = 1; year <= lifespan; year++) {
            const inflationFactor = Math.pow(1 + constants.inflationRate, year-1);
            
            totalFuelCost += (annualDistance / fuelEconomy) * fuelPrice * inflationFactor;
            totalMaintenanceICE += constants.annualMaintenanceICE * inflationFactor;
            totalTaxICE += constants.annualTaxICE * inflationFactor;
            
            totalElectricityCost += (annualDistance / constants.evEfficiency) * constants.electricityCost * inflationFactor;
            totalMaintenanceEV += constants.annualMaintenanceEV * inflationFactor;
            totalTaxEV += constants.annualTaxEV * inflationFactor;
        }
        
        const fuelSavings = totalFuelCost - totalElectricityCost;
        const maintenanceSavings = totalMaintenanceICE - totalMaintenanceEV;
        const taxSavings = totalTaxICE - totalTaxEV;
        const totalSavings = fuelSavings + maintenanceSavings + taxSavings;
        
        document.getElementById('fuel-savings').textContent = formatCurrency(fuelSavings);
        document.getElementById('maintenance-savings').textContent = formatCurrency(maintenanceSavings);
        document.getElementById('tax-savings').textContent = formatCurrency(taxSavings);
        document.getElementById('total-savings').textContent = formatCurrency(totalSavings);
        
        updateChart(fuelSavings, maintenanceSavings, taxSavings);
    }

    // Update pie chart
    function updateChart(fuel, maintenance, tax) {
        savingsChart.data.datasets[0].data = [
            Math.max(0, fuel),
            Math.max(0, maintenance),
            Math.max(0, tax)
        ];
        savingsChart.update();
    }

    // Format currency
    function formatCurrency(amount) {
        return '₹' + Math.round(amount).toLocaleString('en-IN');
    }

    // Event Listeners
    calculateBtn.addEventListener('click', async function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
        await fetchFuelPrices();
        updateFuelPriceDisplay();
        calculateSavings();
        this.innerHTML = '<i class="fas fa-sync-alt"></i> UPDATE CALCULATION';
    });
    
    document.querySelectorAll('input[type="range"], input[type="number"], input[name="vehicle-type"]').forEach(input => {
        input.addEventListener('input', calculateSavings);
        input.addEventListener('change', calculateSavings);
    });
});