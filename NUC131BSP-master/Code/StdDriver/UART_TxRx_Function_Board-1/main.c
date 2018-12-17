/****************************************************************************
 * @file     main.c
 * @version  V3.00
 * $Revision: 9 $
 * $Date: 15/06/04 10:36a $
 * @brief    Transmit and receive data from PC terminal through RS232 interface.
 * @note
 * Copyright (C) 2014 Nuvoton Technology Corp. All rights reserved.
 *
 ******************************************************************************/
#include <stdio.h>
#include "NUC131.h"
#include "DrvGPIO.h"



#define PLL_CLOCK   50000000

#define RXBUFSIZE   1024

/*---------------------------------------------------------------------------------------------------------*/
/* Global variables                                                                                        */
/*---------------------------------------------------------------------------------------------------------*/
uint8_t g_u8RecData[RXBUFSIZE]  = {0};

volatile uint32_t g_u32comRbytes = 0;
volatile uint32_t g_u32comRhead  = 0;
volatile uint32_t g_u32comRtail  = 0;
volatile int32_t g_bWait         = TRUE;
 uint16_t data=100;
/*---------------------------------------------------------------------------------------------------------*/
/* Define functions prototype                                                                              */
/*---------------------------------------------------------------------------------------------------------*/
int32_t main(void);



void SYS_Init(void)
{
    /*---------------------------------------------------------------------------------------------------------*/
    /* Init System Clock                                                                                       */
    /*---------------------------------------------------------------------------------------------------------*/

    /* Enable Internal RC 22.1184MHz clock */
    CLK_EnableXtalRC(CLK_PWRCON_OSC22M_EN_Msk);

    /* Waiting for Internal RC clock ready */
    CLK_WaitClockReady(CLK_CLKSTATUS_OSC22M_STB_Msk);

    /* Switch HCLK clock source to Internal RC and HCLK source divide 1 */
    CLK_SetHCLK(CLK_CLKSEL0_HCLK_S_HIRC, CLK_CLKDIV_HCLK(1));

    /* Enable external XTAL 12MHz clock */
    CLK_EnableXtalRC(CLK_PWRCON_XTL12M_EN_Msk);

    /* Waiting for external XTAL clock ready */
    CLK_WaitClockReady(CLK_CLKSTATUS_XTL12M_STB_Msk);

    /* Set core clock as PLL_CLOCK from PLL */
    CLK_SetCoreClock(PLL_CLOCK);

    /* Enable UART module clock */
    CLK_EnableModuleClock(UART0_MODULE);

    /* Select UART module clock source */
    CLK_SetModuleClock(UART0_MODULE, CLK_CLKSEL1_UART_S_HXT, CLK_CLKDIV_UART(1));
		
    /*---------------------------------------------------------------------------------------------------------*/
    /* Init I/O Multi-function                                                                                 */
    /*---------------------------------------------------------------------------------------------------------*/
    /* Set GPB multi-function pins for UART0 RXD(PB.0) and TXD(PB.1) */
    SYS->GPB_MFP &= ~(SYS_GPB_MFP_PB0_Msk | SYS_GPB_MFP_PB1_Msk);
    SYS->GPB_MFP |= SYS_GPB_MFP_PB0_UART0_RXD | SYS_GPB_MFP_PB1_UART0_TXD;
		


}

void UART0_Init()
{
    /*---------------------------------------------------------------------------------------------------------*/
    /* Init UART                                                                                               */
    /*---------------------------------------------------------------------------------------------------------*/
    /* Reset UART0 module */
    SYS_ResetModule(UART0_RST);

    /* Configure UART0 and set UART0 Baudrate */
    UART_Open(UART0, 115200);
		    /* Enable Interrupt and install the call back function */
  //  UART_EnableInt(UART0, (UART_IER_RDA_IEN_Msk | UART_IER_THRE_IEN_Msk | UART_IER_TOUT_IEN_Msk));
}



int main(void)
{
    /* Unlock protected registers */
    SYS_UnlockReg();

    /* Init System, peripheral clock and multi-function I/O */
    SYS_Init();

    /* Lock protected registers */
    SYS_LockReg();

    /* Init UART0 for printf and testing */
    UART0_Init();
		OpenKeyPad();

    while(1)
		{
			
			if(Scankey() == 3)
			{
				CLK_SysTickLongDelay(110000);
				if(Scankey()==3){
					printf("q.");
				}
			}
			
			if(Scankey()== 6)
			{
				CLK_SysTickLongDelay(110000);
				if(Scankey()== 6){
					printf("w.");
				}
			}
			
			/*print e*/
			if(Scankey()== 9)
			{
				CLK_SysTickLongDelay(110000);
				if(Scankey()== 9){
					printf("e.");
				}
			}
			
			/*print a*/
			if(Scankey() == 2)
			{
				CLK_SysTickLongDelay(110000);
				if(Scankey()== 2){
					printf("a.");
				}
			}
			
			//*print s*/
			if(Scankey() == 5)
			{
				CLK_SysTickLongDelay(110000);
				if(Scankey()== 5){
					printf("s.");
				}
			}
			
			/*print d*/
			if(Scankey()== 8)
			{
				CLK_SysTickLongDelay(110000);
				if(Scankey()== 8){
					printf("d.");
				}
			}
			
			/*print z */
			if(Scankey()== 1)
			{
				CLK_SysTickLongDelay(110000);
				if(Scankey()== 1){
					printf("z.");
				}
			}
			
			/*print x */
			if(Scankey()== 4)
			{
				CLK_SysTickLongDelay(110000);
				if(Scankey()== 4){
					printf("x.");
				}
			}
			
						/*print c */
			if(Scankey()== 7)
			{
				CLK_SysTickLongDelay(110000);
				if(Scankey()== 7){
					printf("c.");
				}
			}
			
		}

}




