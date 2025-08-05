// Shopify Integration Service
// Essentials Enhanced OS - E-commerce Integration

export interface ShopifyProduct {
    id: number
    title: string
    handle: string
    status: string
    vendor: string
    product_type: string
    tags: string[]
    variants: ShopifyVariant[]
    images: ShopifyImage[]
    created_at: string
    updated_at: string
    published_at: string
    template_suffix: string
    admin_graphql_api_id: string
    body_html: string
}

export interface ShopifyVariant {
    id: number
    product_id: number
    title: string
    price: string
    sku: string
    position: number
    inventory_policy: string
    compare_at_price: string
    fulfillment_service: string
    inventory_management: string
    option1: string
    option2: string
    option3: string
    created_at: string
    updated_at: string
    taxable: boolean
    barcode: string
    grams: number
    image_id: number
    weight: number
    weight_unit: string
    inventory_item_id: number
    inventory_quantity: number
    old_inventory_quantity: number
    requires_shipping: boolean
    admin_graphql_api_id: string
}

export interface ShopifyImage {
    id: number
    product_id: number
    position: number
    created_at: string
    updated_at: string
    alt: string
    width: number
    height: number
    src: string
    variant_ids: number[]
    admin_graphql_api_id: string
}

export interface ShopifyOrder {
    id: number
    name: string
    email: string
    closed_at: string
    created_at: string
    updated_at: string
    number: number
    note: string
    token: string
    gateway: string
    test: boolean
    total_price: string
    subtotal_price: string
    total_weight: number
    total_tax: string
    taxes_included: boolean
    currency: string
    financial_status: string
    confirmed: boolean
    total_discounts: string
    total_line_items_price: string
    cart_token: string
    buyer_accepts_marketing: boolean
    // name: string // Removed duplicate
    referring_site: string
    landing_site: string
    cancelled_at: string
    cancel_reason: string
    total_price_usd: string
    checkout_token: string
    reference: string
    user_id: number
    location_id: number
    source_identifier: string
    source_url: string
    processed_at: string
    device_id: number
    phone: string
    customer_locale: string
    app_id: number
    browser_ip: string
    landing_site_ref: string
    order_number: number
    discount_applications: any[]
    discount_codes: any[]
    note_attributes: any[]
    payment_gateway_names: string[]
    processing_method: string
    checkout_id: number
    source_name: string
    fulfillment_status: string
    tax_lines: any[]
    tags: string
    contact_email: string
    order_status_url: string
    presentment_currency: string
    total_line_items_price_set: any
    total_discounts_set: any
    total_shipping_price_set: any
    subtotal_price_set: any
    total_price_set: any
    total_tax_set: any
    line_items: ShopifyLineItem[]
    shipping_lines: any[]
    billing_address: ShopifyAddress
    shipping_address: ShopifyAddress
    fulfillments: any[]
    client_details: any
    refunds: any[]
    customer: ShopifyCustomer
}

export interface ShopifyLineItem {
    id: number
    variant_id: number
    title: string
    quantity: number
    sku: string
    variant_title: string
    vendor: string
    fulfillment_service: string
    product_id: number
    requires_shipping: boolean
    taxable: boolean
    gift_card: boolean
    name: string
    variant_inventory_management: string
    properties: any
    product_exists: boolean
    fulfillable_quantity: number
    grams: number
    price: string
    total_discount: string
    fulfillment_status: string
    price_set: any
    total_discount_set: any
    discount_allocations: any[]
    duties: any[]
    admin_graphql_api_id: string
    tax_lines: any[]
}

export interface ShopifyAddress {
    first_name: string
    address1: string
    phone: string
    city: string
    zip: string
    province: string
    country: string
    last_name: string
    address2: string
    company: string
    latitude: number
    longitude: number
    name: string
    country_code: string
    province_code: string
}

export interface ShopifyCustomer {
    id: number
    email: string
    accepts_marketing: boolean
    created_at: string
    updated_at: string
    first_name: string
    last_name: string
    orders_count: number
    state: string
    total_spent: string
    last_order_id: number
    note: string
    verified_email: boolean
    multipass_identifier: string
    tax_exempt: boolean
    tags: string
    last_order_name: string
    currency: string
    phone: string
    addresses: ShopifyAddress[]
    accepts_marketing_updated_at: string
    marketing_opt_in_level: string
    tax_exemptions: string[]
    admin_graphql_api_id: string
    default_address: ShopifyAddress
}

export class ShopifyService {
    private apiKey: string
    private apiSecret: string
    private shopDomain: string
    private accessToken: string

    constructor() {
        this.apiKey = process.env.SHOPIFY_API_KEY || ''
        this.apiSecret = process.env.SHOPIFY_API_SECRET || ''
        this.shopDomain = process.env.SHOPIFY_SHOP_DOMAIN || ''
        this.accessToken = process.env.SHOPIFY_ACCESS_TOKEN || ''
    }

    private async makeRequest(endpoint: string, method: string = 'GET', data?: any) {
        const url = `https://${this.shopDomain}.myshopify.com/admin/api/2024-01/${endpoint}`
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': this.accessToken
        }

        const response = await fetch(url, {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined
        })

        if (!response.ok) {
            throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
        }

        return response.json()
    }

    // Product Management
    async getProducts(limit: number = 50, page_info?: string): Promise<{ products: ShopifyProduct[]; next_page_info?: string }> {
        let url = `products.json?limit=${limit}`
        if (page_info) {
            url += `&page_info=${page_info}`
        }

        const response = await this.makeRequest(url)
        return {
            products: response.products,
            next_page_info: response.next_page_info
        }
    }

    async getProduct(productId: number): Promise<ShopifyProduct> {
        const response = await this.makeRequest(`products/${productId}.json`)
        return response.product
    }

    async createProduct(productData: Partial<ShopifyProduct>): Promise<ShopifyProduct> {
        const response = await this.makeRequest('products.json', 'POST', { product: productData })
        return response.product
    }

    async updateProduct(productId: number, productData: Partial<ShopifyProduct>): Promise<ShopifyProduct> {
        const response = await this.makeRequest(`products/${productId}.json`, 'PUT', { product: productData })
        return response.product
    }

    async deleteProduct(productId: number): Promise<void> {
        await this.makeRequest(`products/${productId}.json`, 'DELETE')
    }

    // Order Management
    async getOrders(limit: number = 50, status?: string): Promise<{ orders: ShopifyOrder[] }> {
        let url = `orders.json?limit=${limit}`
        if (status) {
            url += `&status=${status}`
        }

        const response = await this.makeRequest(url)
        return { orders: response.orders }
    }

    async getOrder(orderId: number): Promise<ShopifyOrder> {
        const response = await this.makeRequest(`orders/${orderId}.json`)
        return response.order
    }

    async updateOrder(orderId: number, orderData: Partial<ShopifyOrder>): Promise<ShopifyOrder> {
        const response = await this.makeRequest(`orders/${orderId}.json`, 'PUT', { order: orderData })
        return response.order
    }

    // Customer Management
    async getCustomers(limit: number = 50): Promise<{ customers: ShopifyCustomer[] }> {
        const response = await this.makeRequest(`customers.json?limit=${limit}`)
        return { customers: response.customers }
    }

    async getCustomer(customerId: number): Promise<ShopifyCustomer> {
        const response = await this.makeRequest(`customers/${customerId}.json`)
        return response.customer
    }

    async createCustomer(customerData: Partial<ShopifyCustomer>): Promise<ShopifyCustomer> {
        const response = await this.makeRequest('customers.json', 'POST', { customer: customerData })
        return response.customer
    }

    async updateCustomer(customerId: number, customerData: Partial<ShopifyCustomer>): Promise<ShopifyCustomer> {
        const response = await this.makeRequest(`customers/${customerId}.json`, 'PUT', { customer: customerData })
        return response.customer
    }

    // Inventory Management
    async getInventoryLevels(locationIds: number[], inventoryItemIds: number[]): Promise<any> {
        const locationIdsStr = locationIds.join(',')
        const inventoryItemIdsStr = inventoryItemIds.join(',')
        const response = await this.makeRequest(`inventory_levels.json?location_ids=${locationIdsStr}&inventory_item_ids=${inventoryItemIdsStr}`)
        return response.inventory_levels
    }

    async adjustInventoryLevel(inventoryItemId: number, locationId: number, availableAdjustment: number): Promise<any> {
        const data = {
            inventory_item_id: inventoryItemId,
            location_id: locationId,
            available_adjustment: availableAdjustment
        }
        const response = await this.makeRequest('inventory_levels/adjust.json', 'POST', data)
        return response.inventory_level
    }

    // Analytics & Reports
    async getAnalytics(startDate: string, endDate: string): Promise<any> {
        const response = await this.makeRequest(`reports.json?since=${startDate}&until=${endDate}`)
        return response.reports
    }

    // Webhook Management
    async createWebhook(topic: string, address: string, format: string = 'json'): Promise<any> {
        const data = {
            webhook: {
                topic,
                address,
                format
            }
        }
        const response = await this.makeRequest('webhooks.json', 'POST', data)
        return response.webhook
    }

    async getWebhooks(): Promise<any> {
        const response = await this.makeRequest('webhooks.json')
        return response.webhooks
    }

    async deleteWebhook(webhookId: number): Promise<void> {
        await this.makeRequest(`webhooks/${webhookId}.json`, 'DELETE')
    }

    // AI-Enhanced Methods
    async getLowStockProducts(threshold: number = 10): Promise<ShopifyProduct[]> {
        const { products } = await this.getProducts(250)
        const lowStockProducts: ShopifyProduct[] = []

        for (const product of products) {
            const totalInventory = product.variants.reduce((sum, variant) => sum + variant.inventory_quantity, 0)
            if (totalInventory <= threshold) {
                lowStockProducts.push(product)
            }
        }

        return lowStockProducts
    }

    async getTopSellingProducts(days: number = 30): Promise<ShopifyProduct[]> {
        const endDate = new Date()
        const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000))

        const { orders } = await this.getOrders(250, 'any')
        const productSales: { [key: number]: number } = {}

        for (const order of orders) {
            const orderDate = new Date(order.created_at)
            if (orderDate >= startDate && orderDate <= endDate) {
                for (const lineItem of order.line_items) {
                    productSales[lineItem.product_id] = (productSales[lineItem.product_id] || 0) + lineItem.quantity
                }
            }
        }

        const topProductIds = Object.entries(productSales)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([id]) => parseInt(id))

        const topProducts: ShopifyProduct[] = []
        for (const productId of topProductIds) {
            try {
                const product = await this.getProduct(productId)
                topProducts.push(product)
            } catch (error) {
                console.error(`Failed to fetch product ${productId}:`, error)
            }
        }

        return topProducts
    }

    async getCustomerSegments(): Promise<{
        vip: ShopifyCustomer[]
        atRisk: ShopifyCustomer[]
        newCustomers: ShopifyCustomer[]
    }> {
        const { customers } = await this.getCustomers(250)
        const now = new Date()
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))

        const segments = {
            vip: [] as ShopifyCustomer[],
            atRisk: [] as ShopifyCustomer[],
            newCustomers: [] as ShopifyCustomer[]
        }

        for (const customer of customers) {
            const lastOrderDate = customer.last_order_id ? new Date(customer.updated_at) : null
            const totalSpent = parseFloat(customer.total_spent)

            if (totalSpent > 1000) {
                segments.vip.push(customer)
            } else if (lastOrderDate && lastOrderDate < thirtyDaysAgo) {
                segments.atRisk.push(customer)
            } else if (customer.orders_count <= 1) {
                segments.newCustomers.push(customer)
            }
        }

        return segments
    }
}

export const shopifyService = new ShopifyService() 