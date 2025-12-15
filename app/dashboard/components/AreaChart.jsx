'use client';

import { useEffect, useRef } from 'react';

export default function AreaChart() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const drawChart = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            // Data for revenue chart
            const data = [45, 52, 38, 65, 48, 72, 58, 85, 68, 92, 78, 95];
            const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            const padding = 50;
            const chartWidth = rect.width - padding * 2;
            const chartHeight = rect.height - padding * 2;

            // Calculate scales
            const maxValue = Math.max(...data);
            const minValue = Math.min(...data);
            const valueRange = maxValue - minValue;

            const xScale = chartWidth / (data.length - 1);
            const yScale = chartHeight / valueRange;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw gradient background
            const gradient = ctx.createLinearGradient(0, padding, 0, rect.height - padding);
            gradient.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
            gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

            // Draw area
            ctx.beginPath();
            ctx.moveTo(padding, rect.height - padding);

            data.forEach((value, index) => {
                const x = padding + index * xScale;
                const y = rect.height - padding - (value - minValue) * yScale;

                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });

            ctx.lineTo(padding + (data.length - 1) * xScale, rect.height - padding);
            ctx.closePath();

            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw line
            ctx.beginPath();
            ctx.strokeStyle = '#8b5cf6';
            ctx.lineWidth = 3;
            ctx.lineJoin = 'round';

            data.forEach((value, index) => {
                const x = padding + index * xScale;
                const y = rect.height - padding - (value - minValue) * yScale;

                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });

            ctx.stroke();

            // Draw grid lines
            ctx.strokeStyle = '#f3f4f6';
            ctx.lineWidth = 1;

            // Horizontal grid lines
            const gridLines = 5;
            for (let i = 0; i <= gridLines; i++) {
                const y = padding + (chartHeight / gridLines) * i;
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(rect.width - padding, y);
                ctx.stroke();
            }

            // Draw data points
            data.forEach((value, index) => {
                const x = padding + index * xScale;
                const y = rect.height - padding - (value - minValue) * yScale;

                // Glow effect
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
                ctx.fill();

                // Point
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
                ctx.strokeStyle = '#8b5cf6';
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            // Draw X-axis labels
            ctx.fillStyle = '#6b7280';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';

            labels.forEach((label, index) => {
                const x = padding + index * xScale;
                const y = rect.height - padding + 15;
                ctx.fillText(label, x, y);
            });

            // Draw Y-axis labels
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';

            for (let i = 0; i <= gridLines; i++) {
                const value = minValue + (valueRange / gridLines) * i;
                const y = rect.height - padding - (value - minValue) * yScale;

                ctx.fillStyle = '#9ca3af';
                ctx.fillText(`$${Math.round(value)}k`, padding - 15, y);
            }

            // Draw title
            ctx.fillStyle = '#1f2937';
            ctx.font = 'bold 14px Inter';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText('Monthly User', padding, 20);
        };

        drawChart();
        window.addEventListener('resize', drawChart);

        return () => window.removeEventListener('resize', drawChart);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
        />
    );
}