import React from 'react'
import '../../css/Navbar.css'
const Navigation = () => {
    return (
        <div class="fixed h-24 top-0 left-0 right-0 bg-color p-4">
            <div class="container mx-auto">

                <ul class="flex space-x-4 text-white">
                    <li><a href="#">Trang chủ</a></li>
                    <li><a href="#">Danh mục 1</a></li>
                    <li><a href="#">Danh mục 2</a></li>
                </ul>
            </div>
        </div>

    )
}

export default Navigation