import React, { useState, useEffect } from 'react'
import { getManager, getBuilding } from '../../../../config/api.admin'
const AssignManagerPage = () => {
    const [managers, setManagers] = useState([])
    const [buildings, setBuildings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const fetchManagerAndBuilding = async () => {
        setIsLoading(true)
        try {
            const [managerResponse, buildingResponse] = await Promise.all([
                getManager(),
                getBuilding()
            ])
            if (managerResponse && managerResponse.data && managerResponse.err === 0) {
                setManagers(managerResponse.data)
                console.log("Manager:", managerResponse)
            }
            if (buildingResponse && buildingResponse.data && buildingResponse.err === 0) {
                setBuildings(buildingResponse.data)
                console.log("Building:", buildingResponse)
            }
        } catch (error) {
            console.error("Error fetching manager and building:", error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchManagerAndBuilding()
    }, [])
  return (
    <div>

    </div>
  )
}

export default AssignManagerPage