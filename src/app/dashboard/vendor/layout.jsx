import { requireRole } from "@/lib/core/sesson"


const VendorLayout = async({ children }) => {
    await requireRole('vendor')
    return children
}

    export default VendorLayout