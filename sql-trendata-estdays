WITH EstDaysTrend AS (
    SELECT 
        printerurl,
        component,
        estdays,
        ROW_NUMBER() OVER (PARTITION BY printerurl, component ORDER BY timestamp DESC) AS rn
    FROM 
        printerdata
),
TrendData AS (
    SELECT 
        printerurl,
        component,
        GROUP_CONCAT(estdays, ', ') AS estdaystrend
    FROM (
        SELECT 
            printerurl,
            component,
            estdays
        FROM 
            EstDaysTrend
        WHERE 
            rn <= 10
        ORDER BY 
            rn DESC
    )
    GROUP BY 
        printerurl, component
)
SELECT 
    printerdata.component,
    printerdata.status,
    printerdata.liferemaining,
    printerdata.estpages,
    printerdata.estdays,
    '[' || TrendData.estdaystrend || ']' AS estdaystrend,
    printerdata.printerurl
FROM 
    printerdata
JOIN 
    TrendData ON printerdata.printerurl = TrendData.printerurl AND printerdata.component = TrendData.component
WHERE 
    printerdata.printerurl = 'https://%' AND timestamp > (SELECT DATETIME('now', '-1 day'))
ORDER BY 
    printerdata.component
