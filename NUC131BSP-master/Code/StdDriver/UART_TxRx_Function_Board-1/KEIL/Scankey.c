/*---------------------------------------------------------------------------------------------------------*/
/*                                                                                                         */
/* Copyright (c) Nuvoton Technology Corp. All rights reserved.                                             */
/*                                                                                                         */
/*---------------------------------------------------------------------------------------------------------*/
#include <stdio.h>
#include "DrvGPIO.h"
#include "Scankey.h"
void delay(void)
{
	int j;
	for(j=0;j<1000;j++);
}

void OpenKeyPad(void)
{
	uint8_t i;
	/* Initial key pad */
	for(i=0;i<6;i++)
	DrvGPIO_Open(E_GPA, i, E_IO_QUASI);
}

void CloseKeyPad(void)
{
	uint8_t i;

	for(i=0;i<6;i++)
	DrvGPIO_Close(E_GPA, i);
}

uint8_t Scankey(void)
{
	uint8_t act[4]={0x3b, 0x3d, 0x3e};    
	uint8_t i,temp,pin;

	for(i=0;i<3;i++)
	{
		temp=act[i];
		for(pin=14;pin<26;pin=pin+2)
		{
			if((temp&0x01)==0x01)
				DrvGPIO_SetBit(E_GPA,pin);
			else
				DrvGPIO_ClrBit(E_GPA,pin);
			temp>>=1;
		}
		delay();
		if(DrvGPIO_GetBit(E_GPA,20)==0)
			return(i+1);
		if(DrvGPIO_GetBit(E_GPA,22)==0)
			return(i+4);
		if(DrvGPIO_GetBit(E_GPA,24)==0)
			return(i+7);
	}
		return 0;
}
