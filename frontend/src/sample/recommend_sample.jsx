import React, { useState } from 'react';

export default function RecommendForm() {
    const [formData, setFormData] = useState({
        distance: '',
        budget: '',
        urgency: '',
        traffic: '',
        weather: '',
        time: '',
        is_weekend: false,
    });
    const [output, setOutput] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        setOutput(getCommuteDecision(formData));
    };

    function getCommuteDecision(input) {
    const {
        distance,
        budget,
        urgency,
        traffic,
        weather,
        time,
        is_weekend,
    } = input;

    // ---- 1. Normalized scores (0 = WAIT, 1 = GO) ----
    const urgencyScore = {
        low: 0.2,
        medium: 0.5,
        high: 0.75,
    }[urgency] ?? 0.4;

    const trafficScore = {
        low: 0.2,
        moderate: 0.5,
        high: 0.7,
    }[traffic] ?? 0.4;

    const weatherScore = {
        clear: 0.3,
        rainy: 0.7,
    }[weather] ?? 0.4;

    // Higher distance → more GO-aligned
    const distanceScore =
        Number(distance) >= 10 ? 0.7 :
        Number(distance) >= 5 ? 0.5 :
        0.2;

    // Higher budget → more GO-aligned
    const budgetScore =
        Number(budget) >= 300 ? 0.7 :
        Number(budget) >= 150 ? 0.5 :
        0.2;

    // Weekends slightly favor WAIT (more relaxed time)
    const weekendScore = is_weekend ? 0.3 : 0.5;

    // Rush hours favor GO
    const hour = Number(time.split(":")[0]);
    const rushHourScore =
        (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)
        ? 0.7
        : 0.3;

    // ---- 2. Weighted sum ----
    const score =
        urgencyScore * 0.25 +
        trafficScore * 0.2 +
        weatherScore * 0.15 +
        distanceScore * 0.15 +
        budgetScore * 0.15 +
        rushHourScore * 0.07 +
        weekendScore * 0.03;

    // ---- 3. Decision Threshold ----
    const decision = score >= 0.5 ? "GO" : "WAIT";

    return {
        score: Number(score.toFixed(2)),
        decision,
    };
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Distance (km): </label>
                <input
                    type="number"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Budget ($): </label>
                <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Urgency: </label>
                <select name="urgency" value={formData.urgency} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div>
                <label>Traffic: </label>
                <select name="traffic" value={formData.traffic} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                </select>
            </div>

            <div>
                <label>Weather: </label>
                <select name="weather" value={formData.weather} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="clear">Clear</option>
                    <option value="rainy">Rainy</option>
                    <option value="snowy">Snowy</option>
                </select>
            </div>

            <div>
                <label>Time: </label>
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        name="is_weekend"
                        checked={formData.is_weekend}
                        onChange={handleChange}
                    />
                    Is Weekend
                </label>
            </div>

            <button type="submit">Submit</button>

            {output && (
                <div>
                    <h3>Recommendation:</h3>
                    <p>Score: {output.score}</p>
                    <p>Decision: {output.decision}</p>
                </div>
            )}
        </form>
    );
}