import { requireRole } from "@/lib/core/sesson";


const AdminLayout = async({ children }) => {
    await requireRole('admin')
    return children
};

export default AdminLayout