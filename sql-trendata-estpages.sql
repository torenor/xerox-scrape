WITH EstPagesTrend AS (
    SELECT 
        printerurl,
        component,
        estpages,
        ROW_NUMBER() OVER (PARTITION BY printerurl, component ORDER BY timestamp DESC) AS rn
    FROM 
        printerdata
),
TrendData AS (
    SELECT 
        printerurl,
        component,
        GROUP_CONCAT(estpages, ', ') AS estpagestrend
    FROM (
        SELECT 
            printerurl,
            component,
            estpages
        FROM 
            EstPagesTrend
        WHERE 
            rn <= 30
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
    '[' || TrendData.estpagestrend || ']' AS estpagestrend,
    printerdata.estdays,
    printerdata.printerurl,
    printerdata."timestamp"
FROM 
    printerdata
JOIN 
    TrendData ON printerdata.printerurl = TrendData.printerurl AND printerdata.component = TrendData.component
WHERE 
    printerdata.printerurl LIKE 'https://%' AND timestamp > (SELECT DATETIME('now', '-1
 day'))
ORDER BY 
    printerdata."timestamp" DESC
    
